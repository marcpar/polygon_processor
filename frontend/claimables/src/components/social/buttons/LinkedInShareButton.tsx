

export default function LinkedInShareButton(props: {
    claimableURI: string
}) {

    function onClick() {
        let redirectURL = new URL(props.claimableURI);
        let shareURL = new URL('https://www.linkedin.com/shareArticle');
        shareURL.searchParams.set('url', redirectURL.toString());
        shareURL.searchParams.set('title', 'check on my cool nft');
        window.open(shareURL.toString());
    }


    return (
        <button onClick={onClick}>LinkedIn</button>
    );
}