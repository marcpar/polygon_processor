
import * as nearAPI from "near-api-js";
import { GetConfig, GetConnection } from "../connection";
import { NEAR_NETWORK_NAME, NEAR_VAULT_CONTRACT_ADDRESS } from "@/config";

type ClaimDetails = {
    VaultContract: string,
    NFTContract: string,
    PrivateKey: string,
    TokenId: string,
}

type Claimable = {
    token_id: string,
    nft_account_id: string,
    public_key: String,
}

type ClaimChallenge = {
    token_id: string,
    nft_account_id: string,
    timestamp_millis: number,
    owner_id: string,
}

interface VaultContract extends nearAPI.Contract {
    get_claimable: (args: {
        nft_account: string,
        token_id: string
    }) => Promise<Claimable | null>,
    claim: (arg: {
        callbackUrl: string,
        args: {
            receiver_id: string,
            claimable_id: string,
            new_public_key?: string,
        }, gas: string
    }) => Promise<boolean> | Promise<void>
}

function GetVaultContract(account: nearAPI.Account): VaultContract {
    return new nearAPI.Contract(account, NEAR_VAULT_CONTRACT_ADDRESS, {
        viewMethods: ['get_claimable'],
        changeMethods: ['claim']
    } as any) as VaultContract;
}

async function GetVaultContractAnonAsync(): Promise<VaultContract> {
    let near = await GetConnection(GetConfig(NEAR_NETWORK_NAME));
    let account = new nearAPI.Account(near.connection, NEAR_VAULT_CONTRACT_ADDRESS);
    return new nearAPI.Contract(account, NEAR_VAULT_CONTRACT_ADDRESS, {
        viewMethods: ['get_claimable'],
        changeMethods: []
    } as any) as VaultContract;
}

export {
    GetVaultContract,
    GetVaultContractAnonAsync
}

export type {
    ClaimDetails,
    Claimable,
    ClaimChallenge
}
