

type ResolveOptions = {
    gatewayURL?: string
}

function ResolveArweaveURIToGateway(uri: string, opts: ResolveOptions = {
    gatewayURL: 'https://arweave.net'
}): string {
    let url = new URL(uri);
    console.log(url);
    let newURL = new URL(opts.gatewayURL ?? ' https://arweave.net');
    newURL.pathname = `${url.host}/${url.pathname.replaceAll(/^\/*/g, '')}`;
    return newURL.toString();
}

export { ResolveArweaveURIToGateway }