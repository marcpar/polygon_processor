import { Payload, ParsePayloadFromJSONString } from '../queue/common';
import axios, { AxiosError } from 'axios';
import { Sleep, Logger } from 'lib/dist/util';
import { Emit } from './event';
import { CreateClaimable } from './eth';
import { Queue } from 'lib/dist/queue';
import { withRetry } from 'lib/dist/util/retry';

let _queue: Queue<string>;

/**
 * Number of jobs currently being processed
 */
let _processing: number = 0;

/**
 * Maximum number of jobs that will be processed
 */
let _maxProcessingJobs = 0;

function SetQueue(queue: Queue<string>) {
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
    let payload!: Payload[];
    try {
        let parseResult = ParsePayloadFromJSONString(await _queue.getNextJob());
        if (parseResult.Error) {
            Logger().error(parseResult.Error)
            return;
        } else if (!parseResult.Payload) {
            Logger().error(`payload is ${parseResult.Payload}`)
            return;
        }
        payload = parseResult.Payload;
    } catch (e) {
        Logger().error(e);
        return;
    }

    _processing++;
    (async () => {
        await processJob(payload);
    })().then(async () => {
    }).catch(async (e) => {
        
        let err = e as Error;
        for (const _payload of payload) {
            let err_message = `job ${_payload.JobId}, failed due to error: ${err.message}\n${err.stack ?? ''}`;
            Logger().error(err_message, {
                log_type: 'job_failed',
                job_id: _payload.JobId
            });
            Emit({
                JobId: _payload.JobId,
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

async function processJob(payload: Payload[]) {
    Emit({
        Event: 'started',
        JobId: payload[0].JobId,
        Message: `Processing job: ${payload[0].JobId}`
    });
    Logger().info(`creating claimable for : ${payload[0].TokenId}`);
    let tokenId = parseInt(payload[0].TokenId);
    let result = await withRetry(async () => {
        return await CreateClaimable(tokenId);
    }, 5);

    Emit({
        Event: 'success',
        JobId: payload[0].JobId,
        Message: `Successfullly processed: ${payload[0].JobId}`,
        Details: result
    });
}

export {
    Start,
    SetQueue,
    SetMaxJobs
}