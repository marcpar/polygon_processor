type Claimable = {
    uri: string,
    metadata: ClaimableMetadata,
}

type ClaimDetails = {
    PrivateKey: string,
    TokenContractAddress: string,
    TokenId: number
}

type ClaimableMetadata = {
    name: string,
    position: string,
    group: string,
    event: string,
    date: string
}

function parseFromString(str: string): ClaimDetails {
    return JSON.parse(str);
}

function parseFromBase64String(str: string): ClaimDetails {
    return parseFromString(Buffer.from(str, 'base64').toString('utf-8'));
}

export type {
    Claimable,
    ClaimableMetadata,
    ClaimDetails
}

export {
    parseFromString,
    parseFromBase64String
}