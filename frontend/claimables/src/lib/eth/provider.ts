function getWindowEthereumProvider(): any {
    
    const ethereum = (window as any).ethereum;
    if (!ethereum) {
        throw new Error('window.ethereum is not available, please install metamask');
    }
    return ethereum;
}

async function addNetwork() {

}

async function configureProvider() {
    await changeNetworkMumbai();
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

export {
    getWindowEthereumProvider,
    configureProvider
}