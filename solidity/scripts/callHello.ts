import { ethers } from "hardhat";

(async () => {
    let nftFactory = await ethers.getContractFactory("NFT");
    let nft = nftFactory.attach(process.env.PROXY_ADDRESS as string);
    let message = await nft.externalHello();
    console.log(message);
})();