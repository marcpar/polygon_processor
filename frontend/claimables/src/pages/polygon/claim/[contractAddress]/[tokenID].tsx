import { useRouter } from 'next/router';
import style from '@/styles/claim.module.css';
import { useEffect, useState, MouseEvent } from 'react';

import { ClaimDetails, claimNFT, parseFromBase64String, checkIfAlreadyClaimed, Claimable, getClaimable } from '@/handler';
import { GridLoader } from 'react-spinners';
import { OPENSEA_BASE_URL } from '@/config';
import { configureProvider } from '@/lib/eth';
import ClaimNFT from '@/components/claim/ClaimNFT';

export default function ClaimPolygon() {
    const router = useRouter();
    let contractAddress = router.query.contractAddress as string;
    let tokenID = router.query.tokenID as string;
    let [claimable, setClaimable] = useState<Claimable | undefined>(undefined);
    let [isClaimable, setIsClaimable] = useState<boolean>(false);
    let [isAlreadyClaimed, setIsAlreadyClaimed] = useState<boolean>(false);
    let [claimDetails, setClaimDetails] = useState<ClaimDetails | undefined>(undefined);
    let [isWalletConfigured, setIsWalletConfigured] = useState<boolean>(false);

    async function claimOnClick() {
        if (claimDetails) {
            await claimNFT(claimDetails).then(() => {
                setIsAlreadyClaimed(true);
                window.location.href = `${OPENSEA_BASE_URL}/${claimDetails?.TokenContractAddress}/${claimDetails?.TokenId}`
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
                console.log('configured');
                setIsWalletConfigured(true);
            })
        }
    }, [isWalletConfigured]);

    useEffect(() => {
        if (!isWalletConfigured) return;
        if (!claimDetails) {
            setClaimDetails(parseFromBase64String(window.location.hash));
        }
    }, [isWalletConfigured, claimDetails]);

    useEffect(() => {
        if (!isWalletConfigured) return;
        if (claimable === undefined && contractAddress && tokenID) {
            getClaimable(contractAddress, parseInt(tokenID, 10)).then(async (claimable) => {
                setClaimable(claimable);
            }).catch(e => {
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
        <ClaimNFT
            claimOnClick={claimOnClick}
            claimable={claimable}
            downloadOnClick={downloadOnClick}
            isAlreadyClaimed={isAlreadyClaimed}
            isClaimable={isClaimable}
        />
    );
}