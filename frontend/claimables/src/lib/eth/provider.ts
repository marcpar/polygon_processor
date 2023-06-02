import { POLYGON_NETWORK_ID } from "@/config";

function getWindowEthereumProvider(): any {
    
    const ethereum = (window as any).ethereum;
    if (!ethereum) {
        throw new Error('window.ethereum is not available, please install metamask');
    }
    return ethereum;
}

async function getPolygonProvider(): Promise<any> {
    await configurePolygonProvider();
    return getWindowEthereumProvider();
}

async function configurePolygonProvider(): Promise<any> {
    switch (POLYGON_NETWORK_ID) {
        case 'mainnet':
            return await changeNetworkPolygonMainnet();
        case 'testnet':
            return await changeNetworkMumbai();
        default:
            throw new Error(`unsupported network ${POLYGON_NETWORK_ID}`);
    }
}

async function changeNetworkMumbai() {
    const ethereum = getWindowEthereumProvider();
    try {
        await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: "0x13881" }],
        });
    } catch (err) {
        await addMumbaiNetwork();
    }
}

async function addMumbaiNetwork() {
    const ethereum = getWindowEthereumProvider();
    await ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
            {
                chainId: '0x13881',
                chainName: 'Mumbain Testnet',
                rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
                blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
                nativeCurrency: {
                    symbol: 'MATIC',
                    decimals: 18
                }
            }
        ]
    });
}

async function changeNetworkPolygonMainnet() {
    const ethereum = getWindowEthereumProvider();
    try {
        await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: "0x89" }],
        });
    } catch (err) {
        await addPolygonMainnet();
    }
}

async function addPolygonMainnet(): Promise<void> {
    const ethereum = getWindowEthereumProvider();
    await ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
            {
                chainId: '0x89',
                chainName: 'Polygon Mainnet',
                rpcUrls: ['https://polygon-mainnet.infura.io'],
                blockExplorerUrls: ['https://polygonscan.com/'],
                nativeCurrency: {
                    symbol: 'MATIC',
                    decimals: 18
                }
            }
        ]
    });
}


export {
    getWindowEthereumProvider,
    getPolygonProvider,
    configurePolygonProvider
}