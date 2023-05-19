
import style from '@/styles/components/social/social.module.css';
import FacebookShareButton from './buttons/FacebookShareButton';
import TwitterShareButton from './buttons/TwitterShareButton';
import LinkedInShareButton from './buttons/LinkedInShareButton';
import CopyLinkButton from './buttons/CopyLinkButton';

export default function ShareSocialMedia(props: {
    claimableURI: string
}) {
    return (
        <div className={style.main}>
            <div className={style.share_options}>
                <FacebookShareButton claimableURI={props.claimableURI}/>
                <TwitterShareButton claimableURI={props.claimableURI}/>
                <LinkedInShareButton claimableURI={props.claimableURI}/>
                <CopyLinkButton claimableURI={props.claimableURI}/>
            </div>
        </div>
    );
}