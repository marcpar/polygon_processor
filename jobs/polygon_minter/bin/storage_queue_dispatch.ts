import { GetConfig, LoadConfig } from "../src/config";
import {
    QueueServiceClient,
    StorageSharedKeyCredential
} from "@azure/storage-queue";
import {
    randomUUID
} from 'crypto';
import { Logger } from "lib/dist/util";


LoadConfig();

let config = GetConfig();
let arweaveTxnID = process.argv[2];
let length: number = parseInt(process.argv[3], 10) ?? 1;

(async () => {
    let qsClient = new QueueServiceClient(`https://${config.AzureAccountName}.queue.core.windows.net`, new StorageSharedKeyCredential(config.AzureAccountName, config.AzureAccountKey));
    let qClient = qsClient.getQueueClient(config.Topic);
    
    let batch = new Array();
    for (let index = 0; index < length; index++) {
        let uuid = randomUUID();
        batch.push({ "JobId": `${uuid}:${index}`, "ArweaveTxnId": arweaveTxnID});
    }
    let response = await qClient.sendMessage(JSON.stringify(batch));

    Logger().info(response.messageId);
})();

