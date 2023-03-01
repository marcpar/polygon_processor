import { task } from "hardhat/config";
import { Biconomy } from "@biconomy/mexa";
import { string } from "hardhat/internal/core/params/argumentTypes";
import { MetaTX__factory } from "../typechain-types";
import { JsonRpcProvider, Web3Provider, getDefaultProvider } from "@ethersproject/providers";

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

        let metaTXFactory = await hre.ethers.getContractFactory("MetaTX", wallet);

        let metaTX = metaTXFactory.attach('0x281eF3837672cF2d0e57a56123416e332A82a168');

        let popTX = await metaTX.populateTransaction.sayHello(args.message);
        let txData = popTX as any;
        txData.signatureType = "EIP712_SIGN";
        console.log(txData);
        
        biconomy.provider.send?.({
            method: "eth_sendTransaction",
            params: [txData]
        }, (err, resp) => {});
        
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