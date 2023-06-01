import { useRouter } from 'next/router';
import style from '@/styles/components/claim/claim.module.css';
import { useEffect, useState } from 'react';
import { claimNFT, checkIfAlreadyClaimed, getClaimable, ClaimDetails, parseFromBase64String } from '@/handler/polygon';
import { GridLoader } from 'react-spinners';
import { POLYGON_OPENSEA_BASE_URL } from '@/config';
import { configureProvider } from '@/lib/eth';
import ClaimNFT from '@/components/claim/ClaimNFT';
import LoaderModal from '@/components/loader/LoaderModal';
import { Claimable } from '@/handler/common';

export default function ClaimPolygon() {
    const router = useRouter();
    let contractAddress = router.query.contractAddress as string;
    let tokenID = router.query.tokenID as string;
    let [claimable, setClaimable] = useState<Claimable | undefined>(undefined);
    let [isClaimable, setIsClaimable] = useState<boolean>(false);
    let [isAlreadyClaimed, setIsAlreadyClaimed] = useState<boolean>(false);
    let [claimDetails, setClaimDetails] = useState<ClaimDetails | undefined | null>(undefined);
    let [isWalletConfigured, setIsWalletConfigured] = useState<boolean>(false);
    let [isLoaderModalOpen, setIsLoaderModalOpen] = useState<boolean>(false);

    async function claimOnClick() {
        if (claimDetails) {
            setIsLoaderModalOpen(true);
            claimNFT(claimDetails).then(() => {
                setIsAlreadyClaimed(true);
                window.location.href = `${POLYGON_OPENSEA_BASE_URL}/${claimDetails?.TokenContractAddress}/${claimDetails?.TokenId}`
            }).finally(() => {
                setIsLoaderModalOpen(false);
            });
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

    useEffect(() => {
        if (!isWalletConfigured) {
            configureProvider().then(() => {
                setIsWalletConfigured(true);
            })
        }
    }, [isWalletConfigured]);

    useEffect(() => {
        if (!isWalletConfigured) return;
        if (claimDetails === undefined) {
            let claimDetails = null;
            try {
                claimDetails = parseFromBase64String(window.location.hash)
            } catch (e) {
                console.error(e);
            };
            setClaimDetails(claimDetails);
        }
    }, [isWalletConfigured, claimDetails]);

    useEffect(() => {
        if (!isWalletConfigured) return;
        if (claimable === undefined && contractAddress && tokenID) {
            getClaimable(contractAddress, parseInt(tokenID, 10)).then(async (claimable) => {
                setClaimable(claimable);
            }).catch(e => {
                console.error(e);
                window.location.reload();
            });
        }
    }, [isWalletConfigured, claimable, contractAddress, tokenID]);

    useEffect(() => {
        if (!isWalletConfigured) return;
        if (!isAlreadyClaimed && claimDetails) {
            checkIfAlreadyClaimed(claimDetails).then(async (isClaimed) => {
                setIsAlreadyClaimed(isClaimed);
                setIsClaimable(!isClaimed);
            }).catch(e => {
                console.error(e);
                window.location.reload();
            });
        }
    }, [isWalletConfigured, isAlreadyClaimed, claimDetails]);

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
                isClaimable={isClaimable}
            />
            <LoaderModal isOpen={isLoaderModalOpen} />
        </div>
    );
}