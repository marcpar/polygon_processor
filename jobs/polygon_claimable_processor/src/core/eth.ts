import { JsonRpcProvider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import { MultiToken__factory, MultiToken, GasToken, GasToken__factory, ClaimToken, ClaimToken__factory } from 'solidity/typechain-types';

type EthConfig = {
    privateKey: string,
    networkID: string,
    rpcURL: string,
    claimTokenAddress: string,
    multiTokenAddress: string,
    multiTokenMinterAddress: string,
    claimableBaseURL: string
}

type ClaimableResult = {
    ClaimURL: string
}

type Claimable = {
    PrivateKey: string,
    TokenContractAddress: string,
    TokenId: number
}

let _config: EthConfig;
let _provider: JsonRpcProvider;
let _wallet: Wallet;
let _multiToken: MultiToken;
let _claimToken: ClaimToken;

function ConfigureEth(config: EthConfig) {
    _config = config;
    _provider = new JsonRpcProvider(_config.rpcURL, 80001);
    _wallet = new Wallet(_config.privateKey, _provider);
    _multiToken = MultiToken__factory.connect(_config.multiTokenAddress, _wallet);
    _claimToken = ClaimToken__factory.connect(_config.claimTokenAddress, _wallet);
}

async function CreateClaimable(tokenId: number): Promise<ClaimableResult> {
    let newWallet = Wallet.createRandom();
    await _claimToken.externalTransferAssets(_config.multiTokenMinterAddress, _config.multiTokenAddress, newWallet.address, tokenId);
    let claimableURL = new URL(`${_config.claimableBaseURL}/${_config.multiTokenAddress}/${tokenId}`);
    claimableURL.hash = Buffer.from(JSON.stringify({
        PrivateKey: newWallet.privateKey,
        TokenContractAddress: _config.multiTokenAddress,
        TokenId: tokenId
    } satisfies Claimable), 'utf-8').toString('base64url');

    return {
        ClaimURL: claimableURL.toString()
    }
}

async function BatchCreateClaimable(tokenIds: number[]): Promise<ClaimableResult[]> {
    let claimableResult: ClaimableResult[] = [];
    let newAddresses: string[] = [];
    for (const tokenId of tokenIds) {
        let newWallet = Wallet.createRandom();
        newAddresses.push(newWallet.address);

        let claimableURL = new URL(`${_config.claimableBaseURL}/${_config.multiTokenAddress}/${tokenId}`);
        claimableURL.hash = Buffer.from(JSON.stringify({
            PrivateKey: newWallet.privateKey,
            TokenContractAddress: _config.multiTokenAddress,
            TokenId: tokenId
        } satisfies Claimable), 'utf-8').toString('base64url');

        claimableResult.push({
            ClaimURL: claimableURL.toString()
        });
    }
    await _claimToken.externalBatchTransferAssets(_config.multiTokenMinterAddress, _config.multiTokenAddress, newAddresses, tokenIds);

    return claimableResult;
}

export {
    ConfigureEth,
    CreateClaimable,
    BatchCreateClaimable
}