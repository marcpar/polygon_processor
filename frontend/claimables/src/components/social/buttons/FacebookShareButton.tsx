

export default function FacebookShareButton(props: {
    claimableURI: string
}) {

    
    function onClick() {
        let redirectURL = new URL(props.claimableURI);
        let shareURL = new URL('https://www.facebook.com/sharer/sharer.php');
        shareURL.searchParams.set('u', redirectURL.toString());
        window.open(shareURL);
    }

    return (
        <button onClick={onClick}>Facebook</button>
    );
}