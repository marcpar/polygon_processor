import { useRouter } from 'next/router';
import style from '@/styles/claim.module.css';
import Tilt from 'react-parallax-tilt';
import Podium from '@/assets/PODIUM-VirtualMedal.png';
import ordinal from 'ordinal';
import { useEffect, useState, MouseEvent } from 'react';
import Media from '@/components/media/Media';
import { BrowserProvider, Provider } from 'ethers';
import { ClaimDetails, claimNFT, parseFromBase64String } from '@/lib/claimable/claim';
import { checkBalanceOfAddress, checkIfAlreadyClaimed, Claimable, getClaimable } from '@/handler';
import { GridLoader } from 'react-spinners';



export default function ClaimNFT() {
    const router = useRouter();

    let contractAddress = router.query.contractAddress as string;
    let tokenID = router.query.tokenID as string;
    let [claimable, setClaimable] = useState<Claimable | undefined>(undefined);
    let [isClaimable, setIsClaimable] = useState<boolean>(false);
    let [isAlreadyClaimed, setIsAlreadyClaimed] = useState<boolean>(false);
    let [isMediaLoading, setIsMediaLoading] = useState<boolean>(true);
    let [claimDetails, setClaimDetails] = useState<ClaimDetails | undefined>(undefined);

    function claimOnClick() {
        if (claimDetails) {
            claimNFT(claimDetails).then(() => {
                setIsAlreadyClaimed(true);
                window.location.href = `https://testnets.opensea.io/assets/mumbai/${claimDetails?.TokenContractAddress}/${claimDetails?.TokenId}`
            }).catch(e => {
                throw new Error(e);
            });
        }
    }

    function onClickDownload(e: MouseEvent<HTMLButtonElement>) {
        let anchor = document.createElement<"a">("a");
        let link = `${claimable?.uri}`;
        let button = e.currentTarget;
        button.disabled = true;
        fetch(link).then(async data => {
            anchor.href = URL.createObjectURL(await data.blob());;
            anchor.download = link.split('/').pop() ?? "nft";
            anchor.click();
        }).finally(() => {
            button.disabled = false;
        });
    }

    useEffect(() => {
        if (claimable === undefined && contractAddress && tokenID) {
            getClaimable(contractAddress, parseInt(tokenID, 10)).then(async (claimable) => {
                setClaimable(claimable);
            });
        }
    });

    useEffect(() => {
        if (!isAlreadyClaimed && claimDetails) {
            checkIfAlreadyClaimed(claimDetails).then(async (isClaimed) => {
                setIsAlreadyClaimed(isClaimed);
                setIsClaimable(!isClaimed);
            })
        }
    });

    useEffect(() => {
        if (!claimDetails) {
            setClaimDetails(parseFromBase64String(window.location.hash));
        }
    });

    if (claimable === null || claimable === undefined) {
        return (
            <div className={style.loader_container}>
                <GridLoader color={"rgb(0, 98, 190)"} />
            </div>
        )
    }

    return (
        <div className={style.main_container}>
            <img alt="podium_logo" className={style.podium_logo} src={Podium.src} />
            <div className={style.greetings}>
                <p><b>Congratulations {claimable.metadata.name} for coming {ordinal(parseInt(claimable.metadata.position, 10))} in {claimable.metadata.group} at the {claimable.metadata.event}, {claimable.metadata.date}.</b></p>
                <p>Your virtual medal is ready to claim as an NFT, featuring many benefits. Or simply download the media file as a digital collectible.</p>
            </div>
            <div className={style.flex_container}>
                <Tilt tiltReverse={true} tiltMaxAngleX={7} tiltMaxAngleY={7} glareReverse={true} >
                    <div className={style.media_container}>
                        <Media src={claimable.uri + '/.mp4'} isLoadingSetter={setIsMediaLoading} />
                    </div>
                </Tilt>
                <div className={style.card}>
                    <div className={style.card_header}>NFT benefits</div>
                    <div className={style.card_body}>
                        <hr />
                        <span>Digital collectible</span>
                        <hr />
                        <span>Social media ready</span>
                        <hr />
                        <span>Sponsor rewards enabled</span>
                        <hr />
                        <span>Blockchain certified carbon offset</span>
                        <hr />
                        <span>NFT minted to blockchain</span>
                        <hr />
                    </div>
                    <div className={style.card_footer}>
                        <button onClick={claimOnClick} disabled={isMediaLoading || !isClaimable || isAlreadyClaimed}>{isAlreadyClaimed ? 'Already Claimed' : 'Claim your NFT'}</button>
                    </div>
                </div>
                <div className={style.card}>
                    <div className={style.card_header}>Media file benefits</div>
                    <div className={style.card_body}>
                        <hr />
                        <span>Digital collectible</span>
                        <hr />
                        <span>Social media ready</span>
                        <hr />
                    </div>
                    <div className={style.card_footer}>
                        <button onClick={onClickDownload}>Download</button>
                    </div>
                </div>
            </div>
        </div>
    );
}