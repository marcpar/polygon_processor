import { LoadConfig, GetConfig } from './config';
import { ConfigureEth } from './core/eth';
import { SetDefaultCallBack } from './core/event';
import { SetMaxJobs, SetQueue, Start } from './core/processor';
import { InitLogger } from 'lib/dist/util';
import { CreateAzureStorageQueue } from 'lib/dist/queue';

(async () => {
    InitLogger();
    LoadConfig();
    let config = GetConfig();

    SetDefaultCallBack(config.DefaultCallbackURL);
    SetQueue(CreateAzureStorageQueue(config.AzureAccountName, config.AzureAccountKey, config.Topic));
    ConfigureEth({
        networkID: '80001',
        claimTokenAddress: config.ClaimTokenAddress,
        multiTokenAddress: config.MultiTokenAddress,
        multiTokenMinterAddress: config.MultiTokenMinterAddress,
        privateKey: config.PrivateKey,
        rpcURL: config.RpcUrl,
        claimableBaseURL: config.ClaimableBaseURL
    });
    SetMaxJobs(config.MaxJobs ?? 5);

    await Start();
})();