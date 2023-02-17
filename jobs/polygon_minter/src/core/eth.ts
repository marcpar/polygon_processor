import { JsonRpcProvider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import { Token__factory, Token } from 'solidity/typechain-types';


type EthConfig = {
    privateKey: string,
    networkID: string,
    rpcURL: string,
    contractAddress: string,
    openSeaBaseUrl: string
}

type MintResult = {
    ContractAddress: string,
    TokenId: string,
    OpenSeaUrl: string
}

const TRANSFER_SINGLE_EVENT = 'TransferSingle'

let _config: EthConfig;
let _provider: JsonRpcProvider;
let _wallet: Wallet;
let _token: Token;

function ConfigureEth(config: EthConfig) {
    _config = config;
    _provider = new JsonRpcProvider(_config.rpcURL, 80001);
    _wallet = new Wallet(_config.privateKey, _provider);
    _token = Token__factory.connect(_config.contractAddress, _wallet);
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
        ContractAddress: _config.contractAddress,
        OpenSeaUrl: `${_config.openSeaBaseUrl}/${_config.contractAddress}/${tokenId}`,
        TokenId: tokenId
    };
}

export{
    ConfigureEth,
    Mint
}