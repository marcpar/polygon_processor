import { DequeuedMessageItem, QueueClient, QueueServiceClient, StorageSharedKeyCredential } from "@azure/storage-queue";
import { Emit } from "../core/event";
import { Logger } from "../lib/logger";
import { Sleep } from "../lib/util";
import { Job, ParsePayloadFromJSONString, Payload, Queue } from "./common";


const STORAGE_QUEUE_POLL_INTERVAL = 3000;
const STORAGE_QUEUE_RENEW_LOCK_INTERVAL = 30000;
const MAX_DEQUEUE_COUNT = 10;


function CreateAzureStorageQueue(accountName: string, accountKey: string, queueName: string): Queue {
    let qsClient = new QueueServiceClient(
        `https://${accountName}.queue.core.windows.net`,
        new StorageSharedKeyCredential(accountName, accountKey)
    );

    let qClient = qsClient.getQueueClient(queueName);

    let queue: Queue = {
        async getNextJob(): Promise<Job> {

            return new Promise<Job>(async (resolve, reject) => {
                await qClient.createIfNotExists();
                let currentMessage: DequeuedMessageItem | undefined;

                do {
                    Logger().debug('fetching messages from storage queue');
                    let msgResponse = await qClient.receiveMessages({});

                    currentMessage = msgResponse.receivedMessageItems.pop();
                    if (currentMessage) {
                        Logger().info(`message received: ${currentMessage.messageId} : ${currentMessage.popReceipt}`)
                        if (currentMessage.dequeueCount > MAX_DEQUEUE_COUNT) {
                            Logger().warn(`Message reached max dequeue count (${MAX_DEQUEUE_COUNT}), deleting from queue`);
                            await qClient.deleteMessage(currentMessage.messageId, currentMessage.popReceipt);
                            currentMessage = undefined;
                            continue;
                        }

                        let renewLockInterval = createRenewLockInterval(currentMessage, qClient);

                        let parseResult = ParsePayloadFromJSONString(currentMessage.messageText);
                        if (parseResult.Error !== null && parseResult.Error !== undefined || parseResult.Payload === null) {
                            clearInterval(renewLockInterval);
                            Emit({
                                Event: 'failure',
                                JobId: parseResult.Payload?.pop()?.JobId ?? "",
                                Message: `Failed to parse payload: ${parseResult.Error}`,
                            });
                            qClient.deleteMessage(currentMessage.messageId, currentMessage.popReceipt);
                            reject(parseResult.Error);
                            break;
                        }

                        let payload = parseResult.Payload;

                        resolve({
                            payload: payload,
                            async complete() {
                                if (!currentMessage) return;
                                clearInterval(renewLockInterval);
                                await qClient.deleteMessage(currentMessage.messageId, currentMessage.popReceipt);
                            },
                            async requeue() {
                                clearInterval(renewLockInterval);
                            }
                        });
                        break;
                    }
                    Logger().debug(`none received, sleeping for ${STORAGE_QUEUE_POLL_INTERVAL}ms`);
                    await Sleep(STORAGE_QUEUE_POLL_INTERVAL);
                } while (!currentMessage);
            });
        },
    };

    return queue;
}

function createRenewLockInterval(currentMessage: DequeuedMessageItem, qClient: QueueClient): NodeJS.Timer {
    let interval: NodeJS.Timer;
    return interval = setInterval(async () => {
        if (!currentMessage) {
            clearInterval(interval);
            return;
        }
        Logger().debug(`renewing lock for message: ${currentMessage.messageId}`)
        let response = await qClient.updateMessage(currentMessage.messageId, currentMessage.popReceipt, undefined, 120);
        currentMessage.popReceipt = response.popReceipt ?? currentMessage.popReceipt;
    }, STORAGE_QUEUE_RENEW_LOCK_INTERVAL);
}



export {
    CreateAzureStorageQueue
}