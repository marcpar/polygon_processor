import { ResolveArweaveURIToGateway } from "@/lib/arweave";
import { ClaimDetails } from "@/lib/claimable/claim";
import { MultiToken } from "@/lib/eth";
import { getWindowEthereumProvider } from "@/lib/eth/provider";
import { GetOpenSeaMetadataFromURI, OpenSeaMetadata } from "@/lib/opensea";
import { BrowserProvider, Wallet } from 'ethers';

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
    let browserProvider = new BrowserProvider(getWindowEthereumProvider());
    let multiTokenContract = new MultiToken(tokenAddress, browserProvider);
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

async function checkBalanceOfAddress(address: string, tokenAddress: string, tokenID: number): Promise<number> {
    let multiTokenContract = new MultiToken(tokenAddress, new BrowserProvider(getWindowEthereumProvider()));
    return multiTokenContract.balanceOf(address, tokenID);
}

async function checkIfAlreadyClaimed(claimDetails: ClaimDetails): Promise<boolean> {
    let address = new Wallet(claimDetails.PrivateKey).address;
    console.log(await checkBalanceOfAddress(address, claimDetails.TokenContractAddress, claimDetails.TokenId));
    return await checkBalanceOfAddress(address, claimDetails.TokenContractAddress, claimDetails.TokenId) === 0;
}

export type {
    Claimable
}

export {
    getClaimable,
    checkBalanceOfAddress,
    checkIfAlreadyClaimed
}