import { ACTIVITY_REPORT_URL } from "@/config";
import { Claimable } from "@/handler/common";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CopyLinkButton(props: {
    claimableURI: string,
    claimable: Claimable
}) {
    function onClick() {
        setTimeout(() => fetch(`${ACTIVITY_REPORT_URL}/${props.claimable.jobID}/copylink`), 0);
        let redirectURL = new URL(props.claimableURI);
        navigator.clipboard.writeText(redirectURL.toString()).then(() => {
            alert('copied to clipboard');
        });
    }
    return (
        <button onClick={onClick}>
            <span>Link</span>
            <FontAwesomeIcon icon={faCopy} />
        </button>
    );
}