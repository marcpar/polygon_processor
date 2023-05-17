
export default function TwitterShareButton() {

    function onClick() {
        let redirectURL = new URL(window.location.href);
        redirectURL.hash = '';
        let shareURL = new URL('https://twitter.com/intent/tweet');
        shareURL.searchParams.set('url', redirectURL.toString());
        shareURL.searchParams.set('text', 'check on my cool nft');
        window.open(shareURL.toString());
    }

    return (
        <button onClick={onClick}>Twitter</button>
    );
}