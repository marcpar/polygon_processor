
import style from '@/styles/components/social/social.module.css';
import FacebookShareButton from './buttons/FacebookShareButton';
import TwitterShareButton from './buttons/TwitterShareButton';
import LinkedInShareButton from './buttons/LinkedInShareButton';
import CopyLinkButton from './buttons/CopyLinkButton';
import { NEAR_NETWORK_NAME } from '@/config';

export default function ShareSocialMedia(props: {
    contractAddress: string,
    tokenId: string,
    network: string,
}) {

    let claimableURI = '';
    if (props.network === 'near') {
        claimableURI = `https://${NEAR_NETWORK_NAME === 'testnet' ? 'testnet' : 'www' }.mintbase.xyz/contract/${props.contractAddress}/token/${props.tokenId}`;
    }
    return (
        <div className={style.main}>
            <div className={style.share_options}>
                <FacebookShareButton claimableURI={claimableURI}/>
                <TwitterShareButton claimableURI={claimableURI}/>
                <LinkedInShareButton claimableURI={claimableURI}/>
                <CopyLinkButton claimableURI={claimableURI}/>
            </div>
        </div>
    );
}