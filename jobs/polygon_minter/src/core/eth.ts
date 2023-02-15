import { Contract, Wallet, JsonRpcProvider } from 'ethers';
import { readFileSync } from 'fs';

type EthConfig = {
    privateKey: string,
    networkID: string,
    rpcURL: string,
    contractAddress: string
}

let _config: EthConfig;
let _provider: JsonRpcProvider;
let _wallet: Wallet;
let _contract: Contract;

function ConfigureEth(config: EthConfig) {
    _config = config;
    _provider = new JsonRpcProvider(_config.rpcURL, 80001);
    _wallet = new Wallet(_config.privateKey, _provider);
    _contract = new Contract(config.contractAddress, JSON.parse(readFileSync('./src/core/abi.json').toString('utf-8')), _wallet);
}

async function Mint(uri: string): Promise<void> {

    let res = await _contract.externalMintNFT(uri);
    console.log(await res.wait());
    
}

export{
    ConfigureEth,
    Mint
}