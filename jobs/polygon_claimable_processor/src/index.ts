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
        gasTokenAddress: config.GasTokenAddress,
        multiTokenAddress: config.MultiTokenAddress,
        privateKey: config.PrivateKey,
        rpcURL: 'https://polygon-testnet-rpc.allthatnode.com:8545'
    });
    SetMaxJobs(config.MaxJobs ?? 5);

    await Start();
})();