

type ResolveOptions = {
    gatewayURL?: string
}

function ResolveArweaveURIToGateway(uri: string, opts: ResolveOptions = {
    gatewayURL: 'https://arweave.net'
}): string {
    let url = new URL(uri);
    let newURL = new URL(opts.gatewayURL ?? ' https://arweave.net');
    newURL.pathname = `${url.pathname.substring(1)}`;
    return newURL.toString();
}

export { ResolveArweaveURIToGateway }