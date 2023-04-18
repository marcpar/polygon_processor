import style from '@/styles/claim.module.css';
import Tilt from 'react-parallax-tilt';
import Podium from '@/assets/PODIUM-VirtualMedal.png';
import ordinal from 'ordinal';
import { useState, MouseEvent } from 'react';
import Media from '@/components/media/Media';
import { Claimable } from '@/handler/common';
import Image from 'next/image';

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
            <Image alt="podium_logo" className={style.podium_logo} src={Podium.src} />
            <div className={style.greetings}>
                <p><b>Congratulations {claimable.metadata.name} for coming {ordinal(parseInt(claimable.metadata.position, 10))} in {claimable.metadata.group} at the {claimable.metadata.event}, {claimable.metadata.date}.</b></p>
                <p>Your virtual medal is ready to claim as an NFT, featuring many benefits. Or simply download the media file as a digital collectible.</p>
            </div>
            <div className={style.flex_container}>
                <Tilt tiltReverse={true} tiltMaxAngleX={7} tiltMaxAngleY={7} glareReverse={true} >
                    <div className={style.media_container}>
                        <Media src={claimable.uri} isLoadingSetter={setIsMediaLoading} />
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
                        <button onClick={_claimOnClick} disabled={isMediaLoading || !isClaimable || isAlreadyClaimed}>{isAlreadyClaimed ? 'Already Claimed' : 'Claim your NFT'}</button>
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
                        <button onClick={_onDownloadClick}>Download</button>
                    </div>
                </div>
            </div>
        </div>
    );
}