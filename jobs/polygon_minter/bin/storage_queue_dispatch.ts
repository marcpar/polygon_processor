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

(async () => {
    let qsClient = new QueueServiceClient(`https://${config.AzureAccountName}.queue.core.windows.net`, new StorageSharedKeyCredential(config.AzureAccountName, config.AzureAccountKey));
    let qClient = qsClient.getQueueClient(config.Topic);
    
    let batch = new Array();
    for (let index = 0; index < 1; index++) {
        let uuid = randomUUID();
        batch.push({ "JobId": uuid, "ArweaveTxnId": '_V6RCQ_2fOl6tNXQ6spGN3xQXxt1dXA9_AT5bG2IC-g'});
    }
    let response = await qClient.sendMessage(JSON.stringify(batch));

    Logger().info(response.messageId);
})();

