import { JsonRpcProvider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import { MultiToken__factory, MultiToken, GasToken, GasToken__factory } from 'solidity/typechain-types';

type EthConfig = {
    privateKey: string,
    networkID: string,
    rpcURL: string,
    gasTokenAddress: string,
    multiTokenAddress: string,
    multiTokenMinterAddress: string,
    claimableBaseURL: string
}

type ClaimableResult = {
    ClaimableURL: string
}

type Claimable = {
    PrivateKey: string,
    TokenContractAddress: string,
    TokenId: number
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
    let newWallet = Wallet.createRandom();
    await (await _multiToken.externalTransferNFTTo(_config.multiTokenMinterAddress, newWallet.address, tokenId, 1)).wait();
    await (await _gasToken.externalMintTo(newWallet.address, 2)).wait();

    let claimableURL = new URL(`${_config.claimableBaseURL}/${_config.multiTokenAddress}/${tokenId}`);
    claimableURL.hash = Buffer.from(JSON.stringify({
        PrivateKey: newWallet.privateKey,
        TokenContractAddress: _config.multiTokenAddress,
        TokenId: tokenId
    } as Claimable), 'utf-8').toString('base64url');

    return {
        ClaimableURL: claimableURL.toString()
    }
}

export {
    ConfigureEth,
    CreateClaimable
}