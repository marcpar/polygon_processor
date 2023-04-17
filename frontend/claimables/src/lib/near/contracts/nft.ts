import { NEAR_NETWORK_NAME } from '@/config';
import * as nearAPI from 'near-api-js';
import { GetConfig, GetConnection } from '../connection';


type NFTToken = {
    token_id: string,
    owner_id: string,
    metadata: {
        title: string | null,
        description: string | null,
        media: string | null,
        media_hash: string | null,
        copies: number | null,
        issued_at: number | null,
        expires_at: number | null,
        starts_at: number | null,
        updated_at: number | null,
        extra: string | null,
        reference: string | null,
        reference_hash: string | null,
    }
}

type NFTContractMetadata = {
    spec: string,
    name: string,
    symbol: string,
    icon: string | null,
    base_uri: string | null,
    reference: string | null,
    reference_hash: string | null
}

interface NFTContract extends nearAPI.Contract {
    nft_token: (args: {
        token_id: string
    }) => Promise<NFTToken | null>,
    nft_metadata: () => Promise<NFTContractMetadata>,
}

async function GetNFTContract(nft: string): Promise<NFTContract> {
    let near = await GetConnection(GetConfig(NEAR_NETWORK_NAME));
    let account = new nearAPI.Account(near.connection, nft);

    return new nearAPI.Contract(account, nft, {
        viewMethods: ['nft_token', 'nft_metadata'],
        changeMethods: []
    } as any) as NFTContract;
}

export {
    GetNFTContract
};

export type {
    NFTToken,
    NFTContractMetadata
};
