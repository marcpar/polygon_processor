import { task } from "hardhat/config";
import { string } from "hardhat/internal/core/params/argumentTypes";

task('mintNFT', 'mints an nft')
    .addParam('tokenUri', 'uri of the token', undefined, string, false)
    .setAction(async (args, hre) => {
        const tokenFactory = await hre.ethers.getContractFactory('MultiToken');
        let token = tokenFactory.attach(process.env.PROXY_ADDRESS as string);
        let result = await token.externalMintNFT(args.tokenUri);
        let receipt = await result.wait(1);
        for (const event of receipt.events ?? []) {
            console.log(JSON.stringify(event));
        }
    });

task('uri', 'gets uri for token_id')
    .addParam('tokenId', 'id of the token', undefined, string, false)
    .setAction(async (args, hre) => {
        const tokenFactory = await hre.ethers.getContractFactory('MultiToken');
        let token = tokenFactory.attach(process.env.PROXY_ADDRESS as string);
        let uri = await token.uri(args.tokenId);
        console.log(uri);
    });