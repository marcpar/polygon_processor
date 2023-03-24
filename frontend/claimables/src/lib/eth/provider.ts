
function getWindowEthereumProvider(): any {
    let ethereum = (window as any).ethereum;
    if (!ethereum) {
        throw new Error('window.ethereum is not available, please install metamask');
    }
    return ethereum;
}

export {
    getWindowEthereumProvider
}