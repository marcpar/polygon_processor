import { ResolveArweaveURIToGateway } from "../arweave"

type OpenSeaMetadata = {
    name: string,
    animation_url: string,
    image: string,
    external_url: string,
    description: string,
    attributes: OpenSeaAttributes[]
}

type OpenSeaAttributes = {
    trait_type: string,
    value: string
}

async function GetOpenSeaMetadataFromURI(uri: string): Promise<OpenSeaMetadata> {
    let _uri = ResolveArweaveURIToGateway(uri);
    let res = await fetch(_uri);
    return res.json();
}

export type {
    OpenSeaMetadata
}

export {
    GetOpenSeaMetadataFromURI
}