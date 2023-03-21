import { useRouter } from 'next/router';
import style from '@/styles/claim.module.css';
import Tilt from 'react-parallax-tilt';
import Podium from '@/assets/PODIUM-VirtualMedal.png';
import ordinal from 'ordinal';
import { useState } from 'react';
import Media from '@/components/media/Media';
import { BrowserProvider, Provider } from 'ethers';


export default function ClaimNFT() {
    const router = useRouter();
    let contractAddress = router.query.contractAddress as string;
    let tokenID = router.query.tokenID as string;
    let [isClaimable, setIsClaimable] = useState<boolean>(true);
    let [isAlreadyClaimed, setIsAlreadyClaimed] = useState<boolean>(false);
    let [isMediaLoading, setIsMediaLoading] = useState<boolean>(true);

    function claimOnClick() {
        alert(`${contractAddress}/${tokenID}`);
    }

    function onClickDownload() {
        let eth = (window as any).ethereum;
        if (eth) {
            let metamask = new BrowserProvider(eth);
            metamask.getSigner().then(async (signer) => {
                let msg = await signer.signMessage('hello');
                alert(msg);
            })

        }

    }

    let fullName = 'Participant';
    let racePosition = '1';
    let groupName = 'raceGroup';
    let eventName = 'eventName';
    let eventDate = 'Event Date';

    return (
        <div className={style.main_container}>
            <img alt="podium_logo" className={style.podium_logo} src={Podium.src} />
            <div className={style.greetings}>
                <p><b>Congratulations {fullName} for coming {ordinal(parseInt(racePosition, 10))} in {groupName} at the {eventName}, {eventDate}.</b></p>
                <p>Your virtual medal is ready to claim as an NFT, featuring many benefits. Or simply download the media file as a digital collectible.</p>
            </div>
            <div className={style.flex_container}>
                <Tilt tiltReverse={true} tiltMaxAngleX={7} tiltMaxAngleY={7} glareReverse={true} >
                    <div className={style.media_container}>
                        <Media src={`https://arweave.net/TRTM67VNFsUzggHpVrlgyl-StaLUvC4p0lggBFj323Y/nft.mp4`} isLoadingSetter={setIsMediaLoading} />
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