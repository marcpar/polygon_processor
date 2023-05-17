

export default function LinkedInShareButton() {

    function onClick() {
        let redirectURL = new URL(window.location.href);
        redirectURL.hash = '';
        let shareURL = new URL('https://www.linkedin.com/shareArticle');
        shareURL.searchParams.set('url', redirectURL.toString());
        shareURL.searchParams.set('title', 'check on my cool nft');
        window.open(shareURL.toString());
    }


    return (
        <button onClick={onClick}>LinkedIn</button>
    );
}