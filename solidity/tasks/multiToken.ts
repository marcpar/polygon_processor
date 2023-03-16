import { task } from "hardhat/config";
import { string } from "hardhat/internal/core/params/argumentTypes";

task('multi-token mint', 'mints an nft')
    .addParam('tokenUri', 'uri of the token', undefined, string, false)
    .setAction(async (args, hre) => {
        let multiTokenAddress = process.env.MULTI_TOKEN_ADDRESS;
        if (!multiTokenAddress || multiTokenAddress.length === 0) {
            throw new Error(`invalid MULTI_TOKEN_ADDRESS: ${multiTokenAddress}`);
        }

        const tokenFactory = await hre.ethers.getContractFactory('MultiToken');
        let token = tokenFactory.attach(multiTokenAddress);
        let result = await token.externalMintNFT(args.tokenUri);
        let receipt = await result.wait(1);
        for (const event of receipt.events ?? []) {
            console.log(JSON.stringify(event));
        }
    });

task('multi-token uri', 'gets uri for token_id')
    .addParam('tokenId', 'id of the token', undefined, string, false)
    .setAction(async (args, hre) => {
        let multiTokenAddress = process.env.MULTI_TOKEN_ADDRESS;
        if (!multiTokenAddress || multiTokenAddress.length === 0) {
            throw new Error(`invalid MULTI_TOKEN_ADDRESS: ${multiTokenAddress}`);
        }

        const tokenFactory = await hre.ethers.getContractFactory('MultiToken');
        let token = tokenFactory.attach(multiTokenAddress);
        let uri = await token.uri(args.tokenId);
        console.log(uri);
    });

task('multi-token set-admin', 'sets admin')
    .addParam('address', 'address of the new admin', undefined, string, false)
    .setAction(async (args, hre) => {
        let multiTokenAddress = process.env.MULTI_TOKEN_ADDRESS;
        if (!multiTokenAddress || multiTokenAddress.length === 0) {
            throw new Error(`invalid GAS_TOKEN_ADDRESS: ${multiTokenAddress}`);
        }
        let multiToken = (await hre.ethers.getContractFactory('GasToken')).attach(multiTokenAddress);
        await (await multiToken.setAdmin(args.address)).wait();
    });