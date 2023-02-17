import { Job, Payload, Queue } from '../queue/common';
import axios, { AxiosError } from 'axios';
import { Sleep } from '../lib/util';
import { Logger } from '../lib/logger';
import { Emit } from './event';
import { Mint } from './eth';

let _queue: Queue;

/**
 * Number of jobs currently being processed
 */
let _processing: number = 0;

/**
 * Maximum number of jobs that will be processed
 */
let _maxProcessingJobs = 0;

function SetQueue(queue: Queue) {
    _queue = queue;
}

function SetMaxJobs(maxJobs: number) {
    _maxProcessingJobs = maxJobs;
}

async function Start() {
    // main processor  loop
    while (true) {
        await loop();
    }
}

async function loop() {
    if (_maxProcessingJobs > 0 && _processing >= _maxProcessingJobs) {
        Logger().debug(`throttling processing ${_processing} jobs`);
        await Sleep(5000);
        return;
    }
    let job!: Job;
    try {
        job = await _queue.getNextJob();
    } catch (e) {
        Logger().error(e);
        return;
    }

    _processing++;
    (async () => {
        await processJob(job);
    })().then(async () => {
        await job.complete();
    }).catch(async (e) => {
        await job.requeue();
        let err = e as Error;
        for (const payload of job.payload) {
            let err_message = `Requeing job ${payload.JobId}, failed due to error: ${err.message}\n${err.stack ?? ''}`;
            Logger().error(err_message, {
                log_type: 'job_failed',
                job_id: payload.JobId
            });
            Emit({
                JobId: payload.JobId,
                Event: "failure",
                Message: err_message,
                Details: {
                    Error: err,
                }
            }).catch(e => {
                Logger().error(`Failed to send failure message to callback: ${e}`);
            });
        }
    }).finally(() => {
        _processing--;
    });
}

async function processJob(job: Job) {
    Emit({
        Event: 'started',
        JobId: job.payload[0].JobId,
        Message: `Processing job: ${job.payload[0].JobId}`
    });
    Logger().info(`minting: ${job.payload[0].ArweaveTxnId}`);
    let result = await Mint(`ar://${job.payload[0].ArweaveTxnId}/opensea.json`);
    Emit({
        Event: 'success',
        JobId: job.payload[0].JobId,
        Message: `Successfullly processed: ${job.payload[0].JobId}`,
        Details: result
    });
}

export {
    Start,
    SetQueue,
    SetMaxJobs
}