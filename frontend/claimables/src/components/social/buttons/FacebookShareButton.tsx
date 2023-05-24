import { ACTIVITY_REPORT_URL } from "@/config";
import { Claimable } from "@/handler/common";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function FacebookShareButton(props: {
    claimableURI: string,
    claimable: Claimable
}) {

    
    function onClick() {
        setTimeout(() => fetch(`${ACTIVITY_REPORT_URL}/${props.claimable.jobID}/facebook`), 0);
        // let redirectURL = new URL(props.claimableURI);
        // let shareURL = new URL('https://www.facebook.com/sharer/sharer.php');
        // shareURL.searchParams.set('u', redirectURL.toString());
        window.open('https://www.facebook.com/');
    }

    return (
        <button onClick={onClick}>
            <FontAwesomeIcon icon={faFacebook}/>
        </button>
    );
}