import { ResolveArweaveURIToGateway } from "@/lib/arweave";
import { MultiToken } from "@/lib/eth";
import { GetOpenSeaMetadataFromURI, OpenSeaMetadata } from "@/lib/opensea";
import { BrowserProvider } from 'ethers';

type Claimable = {
    uri: string,
    metadata: ClaimableMetadata
}

type ClaimableMetadata = {
    name: string,
    position: string,
    group: string,
    event: string,
    date: string
}

async function getClaimable(tokenAddress: string, tokenId: number): Promise<Claimable> {
    let ethereum = (window as any).ethereum;
    
    
    let browserProvider = new BrowserProvider(ethereum);
    let signer = await browserProvider.getSigner();
    let multiTokenContract = new MultiToken(tokenAddress, signer);
    let uri = await multiTokenContract.uri(tokenId);
    let metadata = await GetOpenSeaMetadataFromURI(uri);

    return {
        uri: ResolveArweaveURIToGateway(metadata.animation_url),
        metadata: getClaimableMetadataFromOpenseaMetadata(metadata)
    };
}

function getClaimableMetadataFromOpenseaMetadata(meta: OpenSeaMetadata): ClaimableMetadata {
    let name = '';
    let position = '';
    let group = '';
    let event = '';
    let date = '';

    meta.attributes.forEach(attr => {
        let trait = attr.trait_type.trim().toLowerCase();
        switch (trait) {
            case 'recipient name' || 'recipientname':
                name = attr.value;
                break;
            case 'event name' || 'eventname':
                event = attr.value;
                break;
            case 'race position' || 'raceposition':
                position = attr.value;
                break;
            case 'group name' || 'groupname':
                group = attr.value;
                break;
            case 'event date' || 'eventdate':
                date = attr.value;
                break;
        }
    });

    return {
        name,
        position,
        group,
        event,
        date
    }
}

export type {
    Claimable
}

export {
    getClaimable
}