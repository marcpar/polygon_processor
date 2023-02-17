import { LoadConfig, GetConfig } from './config';
import { ConfigureEth } from './core/eth';
import { SetDefaultCallBack } from './core/event';
import { SetMaxJobs, SetQueue, Start } from './core/processor';
import { InitLogger, Logger } from './lib/logger';
import { CreateAzureStorageQueue } from './queue/azure_storage_queue';

(async () => {
    InitLogger();
    LoadConfig();
    let config = GetConfig();

    SetDefaultCallBack(config.DefaultCallbackURL);
    SetQueue(CreateAzureStorageQueue(config.AzureAccountName, config.AzureAccountKey, config.Topic));
    ConfigureEth({
        networkID: '80001',
        contractAddress: config.ProxyAddress,
        privateKey: config.PrivateKey,
        rpcURL: 'https://polygon-testnet-rpc.allthatnode.com:8545',
        openSeaBaseUrl: 'https://testnets.opensea.io/assets/mumbai'
    });
    SetMaxJobs(config.MaxJobs ?? 5);

    await Start();
})();