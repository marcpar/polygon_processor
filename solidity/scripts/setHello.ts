import { ethers } from "hardhat";

(async () => {
    let nftFactory = await ethers.getContractFactory("NFT");
    let nft = nftFactory.attach(process.env.PROXY_ADDRESS as string);
    let result = await nft.externalSetHello("updated hello");
    await result.wait(1);
    console.log(result);
    
})();