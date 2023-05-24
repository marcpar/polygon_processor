import { ACTIVITY_REPORT_URL } from "@/config";
import { Claimable } from "@/handler/common";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function LinkedInShareButton(props: {
    claimableURI: string
    claimable: Claimable
}) {

    function onClick() {
        setTimeout(() => fetch(`${ACTIVITY_REPORT_URL}/${props.claimable.jobID}/linkedin`), 0);
        // let redirectURL = new URL(props.claimableURI);
        // let shareURL = new URL('https://www.linkedin.com/shareArticle');
        // shareURL.searchParams.set('url', redirectURL.toString());
        // shareURL.searchParams.set('title', 'check on my cool nft');
        // window.open(shareURL.toString());
        window.open('https://www.linkedin.com/');
    }

    return (
        <button onClick={onClick}>
            <FontAwesomeIcon icon={faLinkedin}/>
        </button>
    );
}