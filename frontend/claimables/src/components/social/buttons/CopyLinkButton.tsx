

export default function CopyLinkButton(props: {
    claimableURI: string
}) {
    function onClick() {
        let redirectURL = new URL(props.claimableURI);
        navigator.clipboard.writeText(redirectURL.toString()).then(() => {
            alert('copied to clipboard');
        });
    }
    return (
        <button onClick={onClick}>Copy Link</button>
    );
}