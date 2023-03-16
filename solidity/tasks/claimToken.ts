import { task } from "hardhat/config";
import { Biconomy } from "@biconomy/mexa";
import { int, string } from "hardhat/internal/core/params/argumentTypes";

task("sayHello", "Says Hello without gas cost")
    .addParam("sender", "address of the sender", undefined, string)
    .addParam("message", "message to send", undefined, string)
    .setAction(async (args, hre) => {
        let provider = hre.network.provider;
        console.log(process.env.BICONOMY_API_KEY);
        let wallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY_NO_BALANCE ?? '');
        const biconomy = new Biconomy(provider as any, {
            apiKey: process.env.BICONOMY_API_KEY ?? '',
            debug: true,
            contractAddresses: ['0x281eF3837672cF2d0e57a56123416e332A82a168'],
            strictMode: true
        });
        await biconomy.init();

        //let metaTX = new hre.ethers.Contract('0x281eF3837672cF2d0e57a56123416e332A82a168', MetaTX__factory.abi, new hre.ethers.Wallet(process.env.PRIVATE_KEY_NO_BALANCE ?? '', biconomy.ethersProvider));

        let claimTokenFactory = await hre.ethers.getContractFactory("ClaimToken", wallet);

        let claimToken = claimTokenFactory.attach('0x281eF3837672cF2d0e57a56123416e332A82a168');

        let popTX = await claimToken.populateTransaction.externalClaimNFT('', '', 1);
        let txData = popTX as any;
        txData.signatureType = "EIP712_SIGN";
        console.log(txData);

        biconomy.provider.send?.({
            method: "eth_sendTransaction",
            params: [txData]
        }, (err, resp) => { });

        await new Promise((resolve, reject) => {
            biconomy.on("txMined", data => {
                console.log(data);
                resolve(data);
            });
            setTimeout(reject, 100000);
        });
    });

task('getLastMessage', "returns last message")
    .setAction(async (args, hre) => {
        let metaTX = (await hre.ethers.getContractFactory("MetaTX")).attach('0x281eF3837672cF2d0e57a56123416e332A82a168');
        console.log(await metaTX.getLastMessage());
    });

task('claimToken create-claimable', 'creates a claimable nft private key')
    .addParam('tokenId', 'id of the token', undefined, int, false)
    .setAction(async (args, hre) => {
        let gasTokenAddress = process.env.GAS_TOKEN_ADDRESS;
        if (!gasTokenAddress || gasTokenAddress.length === 0) {
            throw new Error(`invalid GAS_TOKEN_ADDRESS: ${gasTokenAddress}`);
        }

        let multiTokenAddress = process.env.MULTI_TOKEN_ADDRESS;
        if (!multiTokenAddress || multiTokenAddress.length === 0) {
            throw new Error(`invalid MULTI_TOKEN_ADDRESS: ${multiTokenAddress}`);
        }

        let walletAddress = process.env.WALLET_ADDRESS;
        if (!walletAddress || walletAddress.length === 0) {
            throw new Error(`invalid WALLET_ADDRESS: ${walletAddress}`)
        }

        let gasToken = (await hre.ethers.getContractFactory("GasToken")).attach(gasTokenAddress);
        let multiToken = (await hre.ethers.getContractFactory("MultiToken")).attach(multiTokenAddress);
        let wallet = hre.ethers.Wallet.createRandom();

        await (await gasToken.externalMintTo(wallet.address, 1)).wait();
        await (await multiToken.externalTransferNFTTo(walletAddress, wallet.address, args.tokenId, 1)).wait();

        console.log(`private key: ${wallet.privateKey}`);
        console.log(`mnemonic: ${wallet.mnemonic.phrase}`);
        console.log(`address: ${wallet.address}`);
    });

task('claimToken claim', 'claims the claimable')
    .addParam('key', 'private key of the temporary wallet', undefined, string, false)
    .addParam('to', 'address of the receiver', undefined, string, false)
    .addParam('tokenId', 'id of the token to claim', undefined, int, false)
    .setAction(async (args, hre) => {
        let claimTokenAddress = process.env.CLAIM_TOKEN_ADDRESS;
        if (!claimTokenAddress || claimTokenAddress.length === 0) {
            throw new Error(`invalid CLAIM_TOKEN_ADDRESS: ${claimTokenAddress}`);
        }

        let multiTokenAddress = process.env.MULTI_TOKEN_ADDRESS;
        if (!multiTokenAddress || multiTokenAddress.length === 0) {
            throw new Error(`invaild MULTI_TOKEN_ADDRESS: ${multiTokenAddress}`);
        }

        let biconomyApiKey = process.env.BICONOMY_API_KEY;
        if (!biconomyApiKey || biconomyApiKey.length === 0) {
            throw new Error(`invalid BICONOMY_API_KEY: ${biconomyApiKey}`);
        }
        
        let wallet = new hre.ethers.Wallet(args.key);
        
        let biconomy = new Biconomy(hre.network.provider as any, {
            apiKey: biconomyApiKey,
            contractAddresses: [claimTokenAddress],
            debug: true,
            strictMode: true
        });

        await biconomy.init();

        let claimToken = (await hre.ethers.getContractFactory("ClaimToken", wallet)).attach(claimTokenAddress);
        let populatedTx = await claimToken.populateTransaction.externalClaimNFT(args.to, multiTokenAddress, args.tokenId);

        let tx = populatedTx as any;
        tx.signatureType = "EIP712_SIGN";

        biconomy.provider.send?.({
            method: "eth_sendTransaction",
            params: [tx]
        }, (err, resp) => { });

        await new Promise((resolve, reject) => {
                biconomy.on("txMined", data => {
                    console.log(data);
                    resolve(data);
                });
                biconomy.on("onError", (data: { error: any; transactionId: string }) => {
                    console.log(data);
                    reject();
                });
                biconomy.on("txHashGenerated", (data: { transactionId: string; transactionHash: string; }) => {
                    console.log(data);
                });
                setTimeout(reject, 100000);
            });
        });