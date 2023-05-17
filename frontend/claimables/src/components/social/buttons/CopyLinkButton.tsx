

export default function CopyLinkButton() {
    function onClick() {
        let redirectURL = new URL(window.location.href);
        redirectURL.hash = '';
        navigator.clipboard.writeText(redirectURL.toString()).then(() => {
            alert('copied to clipboard');
        });
    }
    return (
        <button onClick={onClick}>Copy Link</button>
    );
}