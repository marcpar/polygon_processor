import { ACTIVITY_REPORT_URL } from "@/config";
import { Claimable } from "@/handler/common";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function InstagramShareButton(props: {
    claimableURI: string,
    claimable: Claimable
}) {

    function onClick() {
        setTimeout(() => fetch(`${ACTIVITY_REPORT_URL}/${props.claimable.jobID}/instagram`), 0);
        window.open('https://instagram.com');
    }

    return (
        <button onClick={onClick}>
            <FontAwesomeIcon icon={faInstagram}/>
        </button>
    );
}