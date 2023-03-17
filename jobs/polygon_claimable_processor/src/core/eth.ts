import { JsonRpcProvider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import { MultiToken__factory, MultiToken, GasToken, GasToken__factory } from 'solidity/typechain-types';

type EthConfig = {
    privateKey: string,
    networkID: string,
    rpcURL: string,
    gasTokenAddress: string,
    multiTokenAddress: string
}

type ClaimableResult = {
    ContractAddress: string,
    TokenId: string,
    ClaimableURL: string
}

const TRANSFER_SINGLE_EVENT = 'TransferSingle'

let _config: EthConfig;
let _provider: JsonRpcProvider;
let _wallet: Wallet;
let _multiToken: MultiToken;
let _gasToken: GasToken;

function ConfigureEth(config: EthConfig) {
    _config = config;
    _provider = new JsonRpcProvider(_config.rpcURL, 80001);
    _wallet = new Wallet(_config.privateKey, _provider);
    _multiToken = MultiToken__factory.connect(_config.multiTokenAddress, _wallet);
    _gasToken = GasToken__factory.connect(_config.gasTokenAddress, _wallet);
}

async function CreateClaimable(tokenId: number): Promise<ClaimableResult> {
    throw new Error('Not Implemented');
}

export {
    ConfigureEth,
    CreateClaimable
}