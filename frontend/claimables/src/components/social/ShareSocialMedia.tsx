
import style from '@/styles/components/social/social.module.css';
import FacebookShareButton from './buttons/FacebookShareButton';
import TwitterShareButton from './buttons/TwitterShareButton';
import LinkedInShareButton from './buttons/LinkedInShareButton';
import CopyLinkButton from './buttons/CopyLinkButton';
import { Claimable } from '@/handler/common';
import InstagramShareButton from './buttons/InstagramShareButton';

export default function ShareSocialMedia(props: {
    claimableURI: string,
    claimable: Claimable
}) {
    //let [uri, setURI] = useState<string>('');
    // useEffect(() => {
    //     if (uri !== '') return;
    //     let url = new URL(props.claimableURI);
    //     let txID = url.pathname.split('/')[1];
    //     url.pathname = `${txID}/thumbnail.jpg`
    //     fetch(url).then((res) => {
    //         console.log(res);
    //         if (res.ok) {
    //             setURI(res.url);
    //         } else {
    //             setURI(props.claimableURI);
    //         }
    //     });
    // });
  
    // if (uri === '') return (<div></div>);

    return (
        <div className={style.main}>
            <div className={style.share_options}>
                <CopyLinkButton claimableURI={props.claimableURI} claimable={props.claimable}/>
                <FacebookShareButton claimableURI={props.claimableURI} claimable={props.claimable}/>
                <TwitterShareButton claimableURI={props.claimableURI} claimable={props.claimable}/>
                <LinkedInShareButton claimableURI={props.claimableURI} claimable={props.claimable}/>
                <InstagramShareButton claimableURI={props.claimableURI} claimable={props.claimable}/>
            </div>
        </div>
    );
}