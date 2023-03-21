import { useRouter } from 'next/router';

export default function ClaimNFT() {
    const router = useRouter();
    let contractAddress = router.query.contractAddress as string;
    let tokenID = router.query.tokenID as string;

    return (
        <div><h1>Claim your nft {contractAddress}/{tokenID}</h1></div>
    );
}