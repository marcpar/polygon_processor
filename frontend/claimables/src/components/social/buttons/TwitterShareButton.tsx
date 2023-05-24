import { ACTIVITY_REPORT_URL } from "@/config";
import { Claimable } from "@/handler/common";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TwitterShareButton(props: {
    claimableURI: string,
    claimable: Claimable
}) {

    function onClick() {
        setTimeout(() => fetch(`${ACTIVITY_REPORT_URL}/${props.claimable.jobID}/twitter`), 0);
        // let redirectURL = new URL(props.claimableURI);
        // let shareURL = new URL('https://twitter.com/intent/tweet');
        // shareURL.searchParams.set('url', redirectURL.toString());
        // shareURL.searchParams.set('text', 'check on my cool nft');
        // window.open(shareURL.toString());
        window.open('https://twitter.com');
    }

    return (
        <button onClick={onClick}>
            <FontAwesomeIcon icon={faTwitter}/>
        </button>
    );
}