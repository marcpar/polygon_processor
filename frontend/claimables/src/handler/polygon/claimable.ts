import { POLYGON_CLAIM_TOKEN_ADDRESS, POLYGON_TRUSTED_FORWARDER_ADDRESS } from "@/config";
import { ResolveArweaveURIToGateway } from "@/lib/arweave";
import { buildForwardTxRequest, getDataToSignForPersonalSign, sendTransaction } from "@/lib/biconomy/helpers";
import { ClaimToken, Forwarder, MultiToken } from "@/lib/eth";
import { getConfiguredProvider } from "@/lib/eth/provider";
import { GetOpenSeaMetadataFromURI, OpenSeaMetadata } from "@/lib/opensea";
import { BrowserProvider, Wallet } from 'ethers';
import { ClaimDetails, Claimable, ClaimableMetadata } from "../common";

async function getClaimable(tokenAddress: string, tokenId: number): Promise<Claimable> {
    let browserProvider = new BrowserProvider(await getConfiguredProvider(), 80001);
    let multiTokenContract = new MultiToken(tokenAddress, browserProvider);
    let uri = await multiTokenContract.uri(tokenId);
    console.log(uri);
    let metadata = await GetOpenSeaMetadataFromURI(uri);

    return {
        uri: ResolveArweaveURIToGateway(metadata.animation_url) + '/.mp4',
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


async function claimNFT(claimable: ClaimDetails): Promise<void> {
    let browser = new BrowserProvider(await getConfiguredProvider(), 80001);

    let receiver = (await browser.getSigner()).address;
    let wallet = new Wallet(claimable.PrivateKey, browser);
    let claimToken = new ClaimToken(POLYGON_CLAIM_TOKEN_ADDRESS, browser);

    let functionSignature = claimToken.externalClaimNFTFunctionData(receiver, claimable.TokenContractAddress, claimable.TokenId);

    let forwarder = new Forwarder(POLYGON_TRUSTED_FORWARDER_ADDRESS, wallet);
    const batchId = 0;
    const batchNonce = await forwarder.getNonce(wallet.address, batchId);
    const to = POLYGON_CLAIM_TOKEN_ADDRESS;
    const gasEstimate = await browser.estimateGas({
        to: to,
        from: wallet.address,
        data: functionSignature
    });
    const gasNum = Number(gasEstimate.toString(10));

    const request = await buildForwardTxRequest({
        account: wallet.address,
        to: to,
        gasLimitNum: gasNum,
        batchId,
        batchNonce,
        data: functionSignature
    })

    const hash = getDataToSignForPersonalSign(request);

    let sig = await wallet.signMessage(hash);

    await sendTransaction({
        userAddress: wallet.address,
        req: request,
        sig,
        signatureType: 'PERSONAL_SIGN'
    });
}

async function checkBalanceOfAddress(address: string, tokenAddress: string, tokenID: number): Promise<number> {
    let multiTokenContract = new MultiToken(tokenAddress, new BrowserProvider(await getConfiguredProvider(), 80001));
    return multiTokenContract.balanceOf(address, tokenID);
}

async function checkIfAlreadyClaimed(claimDetails: ClaimDetails): Promise<boolean> {
    let address = new Wallet(claimDetails.PrivateKey).address;
    console.log(await checkBalanceOfAddress(address, claimDetails.TokenContractAddress, claimDetails.TokenId));
    return await checkBalanceOfAddress(address, claimDetails.TokenContractAddress, claimDetails.TokenId) === 0;
}

export {
    getClaimable,
    checkBalanceOfAddress,
    checkIfAlreadyClaimed,
    claimNFT
}