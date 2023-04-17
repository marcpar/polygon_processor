import { GetNFTContract } from "@/lib/near/contracts";
import { ClaimDetails, Claimable, ClaimableMetadata } from "../common";

async function getClaimable(tokenAddress: string, tokenId: string): Promise<Claimable> {
    let nft = await GetNFTContract(tokenAddress);
    let meta = await nft.nft_metadata();

    if (!meta) {
        throw new Error(`invalid nft metadata: ${meta}`);
    }

    let res = await nft.nft_token({
        token_id: tokenId
    });

    if (!res) {
        throw new Error(`invalid nft: ${res}`);
    }

    return {
        uri: `${meta.base_uri}/${res.metadata.media}`,
        metadata: await getClaimableMetadataFromReference(`${meta.base_uri}/${res.metadata.reference}`)
    }
}

async function getClaimableMetadataFromReference(reference: string): Promise<ClaimableMetadata> {
    let result = await (await fetch(reference)).json();

    if (!result.ValuePairs) {
        throw new Error(`invalid media reference ${reference}: ${result}`);
    }

    let name = '';
    let date = '';
    let event = '';
    let group = '';
    let position = '';

    for (const el of result.ValuePairs) {
        console.log(el.Key.toLowerCase());
        switch (el.Key.toLowerCase()) {
            case 'recipient name':
            case 'recipientname':
                name = el.Value
                continue;
            case 'event date':
            case 'eventdate':
                date = el.Value
                continue;
            case 'event name':
            case 'eventname':
                event = el.Value;
                continue;
            case 'group name':
            case 'groupname':
                group = el.Value
                continue;
            case 'position':
                position = el.Value
                continue;
            default:
        }
    };

    return {
        name,
        date,
        event,
        group,
        position
    }
}

async function claimNFT(claimable: ClaimDetails): Promise<void> {
    throw new Error('not implemented');
}

async function checkBalanceOfAddress(address: string, tokenAddress: string): Promise<number> {
    throw new Error('not implemented');
}

async function checkIfAlreadyClaimed(claimDetails: ClaimDetails): Promise<boolean> {
    throw new Error('not implemented');
}

export {
    getClaimable,
    claimNFT,
    checkBalanceOfAddress,
    checkIfAlreadyClaimed
}