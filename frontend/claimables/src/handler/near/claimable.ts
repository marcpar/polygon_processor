import { ClaimDetails, GetNFTContract, GetVaultContract, GetVaultContractAnonAsync } from "@/lib/near/contracts";
import { Claimable, ClaimableMetadata } from "../common";
import { NEAR_NETWORK_NAME, NEAR_VAULT_CONTRACT_ADDRESS } from "@/config";
import * as nearAPI from 'near-api-js';
import { GetConfig, GetConfigInMemory } from "@/lib/near/connection";
import { getJobID } from "@/lib/arweave/jobID";

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
        metadata: await getClaimableMetadataFromReference(`${meta.base_uri}/${res.metadata.reference}`),
        jobID: await getJobID(res.metadata.media?.split('/')[0] as string)
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
            case 'raceposition':
            case 'race position':
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

async function claimWithExistingAccount(claimDetailsId: string, nftAccount: string, tokenId: string) {
    let wallet = new nearAPI.WalletConnection(await nearAPI.connect(GetConfig(NEAR_NETWORK_NAME)), '');
    let currentLocation = window.location;
    let successRedirect = new URL(currentLocation.href);
    successRedirect.hash = '';
    successRedirect.pathname = `/near/claim/${nftAccount}/${tokenId}`;
    successRedirect.search = '';
    successRedirect.searchParams.set('claimDetailsId', claimDetailsId)
    successRedirect.protocol = currentLocation.protocol;
    wallet.signOut();
    wallet.requestSignIn({
        successUrl: successRedirect.toString()
    });
}

async function claimWithExistingAccountCallback(claimDetails: ClaimDetails) {
    let wallet = new nearAPI.WalletConnection(await nearAPI.connect(GetConfig(NEAR_NETWORK_NAME)), '');
    if (!wallet.isSignedIn()) {
        throw new Error('wallet is not signed in');
    }

    await sendNFT(wallet.account().accountId, claimDetails);
    wallet.signOut();
}

async function sendNFT(receiver_id: string, claimDetails: ClaimDetails) {
    let nearConfig = GetConfigInMemory(NEAR_NETWORK_NAME);
    let keyStore = new nearAPI.keyStores.InMemoryKeyStore();
    let accountId = claimDetails.VaultContract ?? NEAR_VAULT_CONTRACT_ADDRESS ?? 'vault.world-triathlon.testnet';

    await keyStore.setKey(NEAR_NETWORK_NAME, accountId, nearAPI.KeyPair.fromString(claimDetails.PrivateKey));

    nearConfig.keyStore = keyStore;
    let conn = await nearAPI.connect(nearConfig);
    let vaultContract = GetVaultContract(await conn.account(accountId), claimDetails.VaultContract);

    let callback = NEAR_NETWORK_NAME === 'mainnet'? `https://app.mynearwallet.com/nft-detail/${claimDetails.NFTContract}/${claimDetails.TokenId}` : `https://testnet.mynearwallet.com/nft-detail/${claimDetails.NFTContract}/${claimDetails.TokenId}`;
    
    await vaultContract.claim({
        callbackUrl: callback,
        args: {
            claimable_id: `${claimDetails.NFTContract}:${claimDetails.TokenId}`,
            receiver_id: receiver_id
        }, gas: "60000000000000"
    });
}

async function checkIfClaimable(token: string): Promise<boolean> {
    let tokenObj!: ClaimDetails;
    try {
        tokenObj = JSON.parse(Buffer.from(token, 'base64').toString('utf-8')) as ClaimDetails
    } catch (e) {
        return false;
    }

    let vault = await GetVaultContractAnonAsync(tokenObj.VaultContract);
    let res = await vault.get_claimable({
        nft_account: tokenObj.NFTContract,
        token_id: tokenObj.TokenId
    });
    if (!res) {
        return false;
    }
    let tokenPubKey = nearAPI.utils.KeyPair.fromString(tokenObj.PrivateKey).getPublicKey().toString();
    return tokenPubKey === res.public_key;
}

async function claimNFT(claimable: ClaimDetails): Promise<void> {
    throw new Error('not implemented');
}

async function createNewAccountAndClaim(claimDetails: ClaimDetails, newAccountId: string, newPrivateKey: string, newPublicKey: string) {
    let nearConfig = GetConfigInMemory(NEAR_NETWORK_NAME);
    let keyStore = new nearAPI.keyStores.InMemoryKeyStore();
    let accountId = claimDetails.VaultContract ?? NEAR_VAULT_CONTRACT_ADDRESS ?? 'vault.world-triathlon.testnet';

    await keyStore.setKey(NEAR_NETWORK_NAME, accountId, nearAPI.KeyPair.fromString(claimDetails.PrivateKey));

    nearConfig.keyStore = keyStore;
    let conn = await nearAPI.connect(nearConfig);
    let vaultContract = GetVaultContract(await conn.account(accountId), claimDetails.VaultContract);

    let callback = NEAR_NETWORK_NAME === 'mainnet'? `https://app.mynearwallet.com/auto-import-secret-key#${newAccountId}/${newPrivateKey}` : `https://testnet.mynearwallet.com/auto-import-secret-key#${newAccountId}/${newPrivateKey}`;
    
    await vaultContract.claim({
        callbackUrl: callback,
        args: {
            claimable_id: `${claimDetails.NFTContract}:${claimDetails.TokenId}`,
            receiver_id: newAccountId,
            new_public_key: newPublicKey
        }, gas: "60000000000000"
    });
}

async function checkIfAlreadyClaimed(contractAddress: string, tokenId: string): Promise<boolean> {
    
    let nft = await GetNFTContract(contractAddress);
    let token = await nft.nft_token({
        token_id: tokenId
    });
    if (!token) {
        throw new Error(`invalid token ${tokenId}: ${token}`);
    }
    try {
        let result = await (await GetVaultContractAnonAsync(token.owner_id)).get_claimable({
            nft_account: contractAddress,
            token_id: tokenId
        });
        return result === null
    } catch (_) {
        return true;
    }
    
}

export {
    getClaimable,
    claimNFT,
    checkIfAlreadyClaimed,
    claimWithExistingAccount,
    claimWithExistingAccountCallback,
    checkIfClaimable,
    createNewAccountAndClaim
}