import env from 'dotenv';
import { Logger } from 'lib/dist/util';


type Config = {
    AzureAccountName: string,
    AzureAccountKey: string,
    Topic: string,
    PrivateKey: string,
    MultiTokenAddress: string,
    DefaultCallbackURL: string,
    MaxJobs: number,
    RpcUrl: string,
    OpenSeaBaseUrl: string
}

let config: Config;
env.config();

function LoadConfig() {
    if (!process.env.DEFAULT_CALLBACK_URL) {
        Logger().error("DEFAULT_CALLBACK_URL is a required environment variable")
        process.exit(1);
    }
    if (!process.env.TOPIC) {
        Logger().error("TOPIC is a required environment variable");
        process.exit(1);
    }
    if (!process.env.AZURE_ACCOUNT_NAME) {
        Logger().error("AZURE_ACCOUNT_NAME is a required environment variable");
        process.exit(1);
    }
    if (!process.env.AZURE_ACCOUNT_KEY) {
        Logger().error("AZURE_ACCOUNT_KEY is a required environment variable");
        process.exit(1);
    }
    if (!process.env.MULTI_TOKEN_ADDRESS) {
        Logger().error("MULTI_TOKEN_ADDRESS is a required environment variable");
        process.exit(1);
    }
    if (!process.env.PRIVATE_KEY) {
        Logger().error("PRIVATE_KEY is a required environment variable");
        process.exit(1);
    }
    if (!process.env.RPC_URL) {
        Logger().error("RPC_URL is a required environment variable");
        process.exit(1);
    }
    if (!process.env.OPENSEA_BASE_URL) {
        Logger().error("OPENSEA_BASE_URL is a required environment variable");
        process.exit(1);
    }

    try {
        config = {
            AzureAccountName: process.env.AZURE_ACCOUNT_NAME,
            AzureAccountKey: process.env.AZURE_ACCOUNT_KEY,
            Topic: process.env.TOPIC,
            PrivateKey: process.env.PRIVATE_KEY,
            MultiTokenAddress: process.env.MULTI_TOKEN_ADDRESS,
            DefaultCallbackURL: process.env.DEFAULT_CALLBACK_URL,
            MaxJobs: process.env.MAX_JOBS ? parseInt(process.env.MAX_JOBS) : 0,
            RpcUrl: process.env.RPC_URL,
            OpenSeaBaseUrl: process.env.OPENSEA_BASE_URL
        }
    } catch (e) {
        let err = e as Error;
        Logger().error(`Failed to load configuration, check if .env setting is correct: ${err.message}\n${err.stack ?? ''}`);
        process.exit(1);
    }

    Logger().debug(`loaded configuration:\n${JSON.stringify(config)}`);
}

function GetConfig(): Config {
    if (!config) {
        throw new Error("Config is not yet loaded, call LoadConfig() first");
    }

    return config;
}


export {
    Config,
    LoadConfig,
    GetConfig
}