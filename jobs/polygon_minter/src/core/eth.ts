import { JsonRpcProvider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import { MultiToken__factory, MultiToken } from 'solidity/typechain-types';

type EthConfig = {
    privateKey: string,
    networkID: string,
    rpcURL: string,
    multiTokenAddress: string,
    openSeaBaseUrl: string
}

type MintResult = {
    ContractAddress: string,
    TokenId: string,
    OpenSeaUrl: string
}

const TRANSFER_SINGLE_EVENT = 'TransferSingle'
const TRANSFER_BATCH_EVENT = 'TransferBatch';

let _config: EthConfig;
let _provider: JsonRpcProvider;
let _wallet: Wallet;
let _token: MultiToken;

function ConfigureEth(config: EthConfig) {
    _config = config;
    _provider = new JsonRpcProvider(_config.rpcURL, 80001);
    _wallet = new Wallet(_config.privateKey, _provider);
    _token = MultiToken__factory.connect(_config.multiTokenAddress, _wallet);
}

async function Mint(uri: string): Promise<MintResult> {
    let res = await _token.externalMintNFT(uri);
    let receipt = await res.wait();
    let tokenId = '';
    receipt.events?.forEach(event => {
        if (event.event === TRANSFER_SINGLE_EVENT && event.args && event.args[3]) {
            tokenId = `${event.args[3]}`;
        }
    });
    return {
        ContractAddress: _config.multiTokenAddress,
        OpenSeaUrl: `${_config.openSeaBaseUrl}/${_config.multiTokenAddress}/${tokenId}`,
        TokenId: tokenId
    };
}

async function MintBatch(uris: string[]): Promise<MintResult[]> {
    let res = await _token.externalBatchMintNFTs(uris);
    let receipt = await res.wait();
    let mintResults: MintResult[] = [];
    let ids: string[] = [];
    receipt.events?.forEach(event => {
        if (event.event === TRANSFER_BATCH_EVENT && event.args && event.args[3]) {
            ids.push(...event.args[3]);
        }
    });
    ids.forEach(id => {
        mintResults.push({
            ContractAddress: _config.multiTokenAddress,
            OpenSeaUrl: `${_config.openSeaBaseUrl}/${_config.multiTokenAddress}/${id}`,
            TokenId: `${id}`
        })
    })
    return mintResults;
}

export {
    ConfigureEth,
    Mint,
    MintBatch
}