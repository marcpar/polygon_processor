import { ACTIVITY_REPORT_URL } from "@/config";
import { Claimable } from "@/handler/common";

export default function CopyLinkButton(props: {
    claimableURI: string,
    claimable: Claimable
}) {
    function onClick() {
        fetch(`${ACTIVITY_REPORT_URL}/${props.claimable.jobID}/copylink`);
        let redirectURL = new URL(props.claimableURI);
        navigator.clipboard.writeText(redirectURL.toString()).then(() => {
            alert('copied to clipboard');
        });
    }
    return (
        <button onClick={onClick}>Copy Link</button>
    );
}