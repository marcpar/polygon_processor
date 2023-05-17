

export default function FacebookShareButton() {

    function onClick() {
        let redirectURL = new URL(window.location.href);
        redirectURL.hash = '';
        let shareURL = new URL('https://www.facebook.com/sharer/sharer.php');
        shareURL.searchParams.set('u', redirectURL.toString());
        window.open(shareURL);
    }

    return (
        <button onClick={onClick}>Facebook</button>
    );
}