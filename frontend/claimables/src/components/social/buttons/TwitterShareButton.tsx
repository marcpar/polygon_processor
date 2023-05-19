
export default function TwitterShareButton(props: {
    claimableURI: string
}) {

    function onClick() {
        let redirectURL = new URL(props.claimableURI);
        let shareURL = new URL('https://twitter.com/intent/tweet');
        shareURL.searchParams.set('url', redirectURL.toString());
        shareURL.searchParams.set('text', 'check on my cool nft');
        window.open(shareURL.toString());
    }

    return (
        <button onClick={onClick}>Twitter</button>
    );
}