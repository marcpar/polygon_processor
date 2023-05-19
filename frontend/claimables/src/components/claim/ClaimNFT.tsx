import style from '@/styles/components/claim/claim.module.css';
import Tilt from 'react-parallax-tilt';
import Podium from '@/assets/PODIUM-VirtualMedal.png';
import ordinal from 'ordinal';
import { useState, MouseEvent } from 'react';
import Media from '@/components/media/Media';
import { Claimable } from '@/handler/common';
import ShareSocialMedia from '../social/ShareSocialMedia';

export default function ClaimNFT(props: {
    claimable: Claimable, isAlreadyClaimed: boolean, isClaimable: boolean, claimOnClick: () => Promise<void>, downloadOnClick: () => Promise<void>
}) {

    let [isMediaLoading, setIsMediaLoading] = useState<boolean>(true);
    let claimOnClick = props.claimOnClick;
    let downloadOnClick = props.downloadOnClick;
    let claimable = props.claimable;
    let isClaimable = props.isClaimable;
    let isAlreadyClaimed = props.isAlreadyClaimed;

    function _claimOnClick(e: MouseEvent<HTMLButtonElement>) {
        claimOnClick();
    }

    function _onDownloadClick(e: MouseEvent<HTMLButtonElement>) {
        let current = e.currentTarget;
        current.disabled = true;
        downloadOnClick().finally(() => {
            current.disabled = false;
        });
    }

    return (
        <div className={style.main_container}>
            <img alt="podium_logo" className={style.podium_logo} src={Podium.src} />
            <div className={style.greetings}>
                <p><b>Congratulations {claimable.metadata.name} for coming {ordinal(parseInt(claimable.metadata.position, 10))} in {claimable.metadata.group} at the {claimable.metadata.event}, {claimable.metadata.date}.</b></p>
                <p>Download your Race Capsule as a digital collectible. This is the quickest and easiest way to own it. If you have a wallet and are experienced with crypto you can also claim it as an NFT.</p>
            </div>
            <div className={style.flex_container}>
                <Tilt tiltReverse={true} tiltMaxAngleX={7} tiltMaxAngleY={7} glareReverse={true} >
                    <div className={style.media_container}>
                        <Media src={claimable.uri} isLoadingSetter={setIsMediaLoading} />
                    </div>
                </Tilt>
                <div className={style.card}>
                    <div className={style.card_header}>Digital Collectible</div>
                    <div className={style.card_body}>
                        <hr />
                        <span>Animated video file</span>
                        <hr />
                        <span>Social media ready</span>
                        <hr />
                    </div>
                    <div className={style.card_footer}>
                        <button onClick={_onDownloadClick}>Download</button>
                    </div>
                </div>
                <div className={style.card}>
                    <div className={style.card_header}>NFT</div>
                    <div className={style.card_body}>
                        <hr />
                        <span>Digital collectible</span>
                        <hr />
                        <span>Blockchain-certified carbon offset</span>
                        <hr />
                    </div>
                    <div className={style.card_footer}>
                        <button onClick={_claimOnClick} disabled={isMediaLoading || !isClaimable || isAlreadyClaimed}>{isAlreadyClaimed ? 'Already Claimed' : 'Claim NFT'}</button>
                    </div>
                </div>
            </div>
            <ShareSocialMedia claimableURI={claimable.uri}/>
        </div>
    );
}