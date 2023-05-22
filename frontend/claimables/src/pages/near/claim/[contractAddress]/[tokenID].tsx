import { useRouter } from 'next/router';
import style from '@/styles/components/claim/claim.module.css';
import { useEffect, useState } from 'react';
import { checkIfAlreadyClaimed, checkIfClaimable, claimNFT, claimWithExistingAccount, claimWithExistingAccountCallback, createNewAccountAndClaim, getClaimable } from '@/handler/near';
import { GridLoader } from 'react-spinners';
import { NEAR_NETWORK_NAME, POLYGON_OPENSEA_BASE_URL } from '@/config';
import ClaimNFT from '@/components/claim/ClaimNFT';
import LoaderModal from '@/components/loader/LoaderModal';
import { Claimable } from '@/handler/common';
import ClaimOptionsModal from '@/components/near/ClaimOptionsModal';
import ClaimWithNewAccountModal from '@/components/near/ClaimWithNewAccountModal';
import { ClaimDetails } from '@/lib/near/contracts';
import { randomUUID } from 'crypto';
import ShareSocialMedia from '@/components/social/ShareSocialMedia';
import { NextSeo } from 'next-seo';
import { url } from 'inspector';

export default function ClaimNear() {
    const router = useRouter();
    let contractAddress = router.query.contractAddress as string;
    let tokenID = router.query.tokenID as string;
    let claimDetailsId = router.query.claimDetailsId as string;
    let [claimable, setClaimable] = useState<Claimable | undefined>(undefined);
    let [isClaimable, setIsClaimable] = useState<boolean>(false);
    let [isAlreadyClaimed, setIsAlreadyClaimed] = useState<boolean>(false);
    let [claimDetails, setClaimDetails] = useState<ClaimDetails | undefined>(undefined);
    let [isLoaderModalOpen, setIsLoaderModalOpen] = useState<boolean>(false);
    let [isClaimOptionsOpen, setIsClaimOptionsOpen] = useState<boolean>(false);
    let [isClaimWithNewAccountOpen, setIsClaimWithNewAccountOpen] = useState<boolean>(false);

    async function claimOnClick() {
        if (claimDetails) {
            setIsClaimOptionsOpen(true);
        }
    }

    async function downloadOnClick() {
        let anchor = document.createElement<"a">("a");
        let link = `${claimable?.uri}`;
        let data = await fetch(link);
        anchor.href = URL.createObjectURL(await data.blob());;
        anchor.download = link.split('/').pop() ?? "nft";
        anchor.click();
    }

    function onClaimOptionWithExistingAccount() {
        if (!claimDetails) {
            return;
        }
        let uuid = window.crypto.randomUUID();
        localStorage.setItem(uuid, JSON.stringify(claimDetails));
        claimWithExistingAccount(uuid, claimDetails.NFTContract, claimDetails.TokenId);
    }

    function onClaimOptionWithNewAccount() {
        setIsClaimOptionsOpen(false);
        setIsClaimWithNewAccountOpen(true);
    }

    function onClaimWithNewAccount(accountId: string, privateKey: string, publicKey: string) {
        if (claimDetails) {
            setIsClaimWithNewAccountOpen(false);
            setIsLoaderModalOpen(true);
            createNewAccountAndClaim(claimDetails, accountId, privateKey, publicKey).then(() => {
                setIsAlreadyClaimed(true);
                setIsLoaderModalOpen(false);
                window.location.href = `https://${NEAR_NETWORK_NAME === "mainnet" ? 'app' : 'testnet'}.mynearwallet.com/auto-import-secret-key#${accountId}/${privateKey}`;
            });
        }
    }

    useEffect(() => {
        if (!claimDetails && window.location.hash.length > 0) {
            checkIfClaimable(window.location.hash).then(result => {
                setIsClaimable(result);
                if (result) {
                    setClaimDetails(JSON.parse(Buffer.from(window.location.hash, 'base64').toString('utf-8')));
                }
            })

        }
    });

    useEffect(() => {
        if (claimable === undefined && contractAddress && tokenID) {
            getClaimable(contractAddress, tokenID).then(claimable => {
                setClaimable(claimable);
            });
        }
    }, [claimable, contractAddress, tokenID]);

    useEffect(() => {
        if (!isAlreadyClaimed && contractAddress && tokenID) {
            checkIfAlreadyClaimed(contractAddress, tokenID).then(isClaimed => setIsAlreadyClaimed(isClaimed));
        }
    }, [isAlreadyClaimed, contractAddress, tokenID]);

    useEffect(() => {
        if (claimDetails) return;
        if (!claimDetailsId) return;
        let claimDetailsString = localStorage.getItem(claimDetailsId);

        if (!claimDetailsString) return;
        let _claimDetails = JSON.parse(claimDetailsString) as ClaimDetails;
        setIsLoaderModalOpen(true);
        claimWithExistingAccountCallback(_claimDetails).then(() => {
            setIsLoaderModalOpen(false);
            setIsAlreadyClaimed(true);
            localStorage.removeItem(claimDetailsId);
            window.location.href = `https://${NEAR_NETWORK_NAME === "mainnet" ? "app" : "testnet"}.mynearwallet.com/nft-detail/${_claimDetails.NFTContract}/${_claimDetails.TokenId}`;
        });
    }, [claimDetails, claimDetailsId])

    if (claimable === null || claimable === undefined) {
        return (
            <div className={style.loader_container}>
                <GridLoader color={"rgb(0, 98, 190)"} />
            </div>
        )
    }

    return (
        <>
            <NextSeo
                title='Test Preview'
                description='Video Preview'
                openGraph={{
                    type: 'video.movie',
                    url: claimable.uri,
                }}
            />
            <ClaimNFT
                claimOnClick={claimOnClick}
                claimable={claimable}
                downloadOnClick={downloadOnClick}
                isAlreadyClaimed={isAlreadyClaimed}
                isClaimable={isClaimable}
            />
            <LoaderModal isOpen={isLoaderModalOpen} />
            <ClaimOptionsModal
                isOpen={isClaimOptionsOpen}
                onClaimWithExistingAccount={onClaimOptionWithExistingAccount}
                onClaimWithNewAccount={onClaimOptionWithNewAccount}
                onRequestClose={() => setIsClaimOptionsOpen(false)}
            />
            <ClaimWithNewAccountModal
                isOpen={isClaimWithNewAccountOpen}
                onClaimWithNewAccount={onClaimWithNewAccount}
                onRequestClose={() => setIsClaimWithNewAccountOpen(false)}
            />
            <ShareSocialMedia claimableURI={claimable.uri}/>
        </>
    );
}