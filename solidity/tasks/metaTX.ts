import { task } from "hardhat/config";
import { Biconomy } from "@biconomy/mexa";
import { string } from "hardhat/internal/core/params/argumentTypes";
import { MetaTX__factory } from "../typechain-types";

task("sayHello", "Says Hello without gas cost")
    .addParam("sender", "address of the sender", undefined, string)
    .addParam("message", "message to send", undefined, string)
    .setAction(async (args, hre) => {
        console.log(process.env.BICONOMY_API_KEY);
        const biconomy = new Biconomy(hre.ethers.provider as any, {
            apiKey: process.env.BICONOMY_API_KEY ?? '',
            debug: true,
            contractAddresses: ['0x281eF3837672cF2d0e57a56123416e332A82a168'],
            strictMode: true
        });
        await biconomy.init();

        let metaTX = new hre.ethers.Contract('0x281eF3837672cF2d0e57a56123416e332A82a168', MetaTX__factory.abi, biconomy.ethersProvider);
        let txData = await metaTX.populateTransaction.sayHello(args.message);
        let txParams = {
            data: txData,
            to: '0x281eF3837672cF2d0e57a56123416e332A82a168',
            from: args.sender,
            signatureType: "EIP712_SIGN",
        };
        let provider = biconomy.provider;
        
        provider.send?.({ method: "sayHello", params: [txParams] }, (err, resp) => {
            if (err) {
                throw err
            }
            console.log(resp);
        });
        

        await new Promise(resolve => {
            setTimeout(resolve, 10000);
        });
    });