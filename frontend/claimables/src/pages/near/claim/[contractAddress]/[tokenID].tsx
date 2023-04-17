import { useRouter } from 'next/router';
import style from '@/styles/claim.module.css';
import { useEffect, useState } from 'react';
import { claimNFT, getClaimable } from '@/handler/near';
import { GridLoader } from 'react-spinners';
import { POLYGON_OPENSEA_BASE_URL } from '@/config';
import ClaimNFT from '@/components/claim/ClaimNFT';
import LoaderModal from '@/components/loader/LoaderModal';
import { Claimable, ClaimDetails, parseFromBase64String } from '@/handler/common';
import ClaimOptionsModal from '@/components/near/ClaimOptionsModal';
import ClaimWithNewAccountModal from '@/components/near/ClaimWithNewAccountModal';

export default function ClaimNear() {
    const router = useRouter();
    let contractAddress = router.query.contractAddress as string;
    let tokenID = router.query.tokenID as string;
    let [claimable, setClaimable] = useState<Claimable | undefined>(undefined);
    let [isClaimable, setIsClaimable] = useState<boolean>(false);
    let [isAlreadyClaimed, setIsAlreadyClaimed] = useState<boolean>(false);
    let [claimDetails, setClaimDetails] = useState<ClaimDetails | undefined>(undefined);
    let [isLoaderModalOpen, setIsLoaderModalOpen] = useState<boolean>(false);
    let [isClaimOptionsOpen, setIsClaimOptionsOpen] = useState<boolean>(false);
    let [isClaimWithNewAccountOpen, setIsClaimWithNewAccountOpen] = useState<boolean>(false);

    async function claimOnClick() {
        setIsClaimOptionsOpen(true);    
        if (claimDetails) {
            
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
        alert('claim with existing')
    }
    function onClaimOptionWithNewAccount() {
        setIsClaimOptionsOpen(false);
        setIsClaimWithNewAccountOpen(true);
    }

    function onClaimWithNewAccount (accountId: string, privateKey: string, publicKey: string) {
        setIsClaimWithNewAccountOpen(false);
        alert(`${accountId}: ${privateKey}`);
        setIsLoaderModalOpen(true);
    }


    useEffect(() => {
        if (!claimDetails && window.location.hash.length > 0) {
            setClaimDetails(parseFromBase64String(window.location.hash));
        }
    }, [claimDetails]);

    useEffect(() => {
        if (claimable === undefined && contractAddress && tokenID) {
            getClaimable(contractAddress, tokenID).then(claimable => {
                console.log(claimable);
                setClaimable(claimable);
            });
        }
    }, [claimable, contractAddress, tokenID]);

    useEffect(() => {
        if (!isAlreadyClaimed && claimDetails) {

        }
    }, [isAlreadyClaimed, claimDetails]);

    if (claimable === null || claimable === undefined) {
        return (
            <div className={style.loader_container}>
                <GridLoader color={"rgb(0, 98, 190)"} />
            </div>
        )
    }

    return (
        <div>
            <ClaimNFT
                claimOnClick={claimOnClick}
                claimable={claimable}
                downloadOnClick={downloadOnClick}
                isAlreadyClaimed={isAlreadyClaimed}
                isClaimable={isClaimable || true}
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
        </div>
    );
}