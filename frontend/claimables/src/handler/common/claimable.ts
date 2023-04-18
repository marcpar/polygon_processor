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



export type {
    Claimable,
    ClaimableMetadata
}