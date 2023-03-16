import { task } from "hardhat/config";
import { string, int } from "hardhat/internal/core/params/argumentTypes";

task('gas-token mint', 'mints a gas token to the specified address')
    .addParam('to', 'receiver of the token', undefined, string, false)
    .addParam('amount', 'amount of token to mint', 1, int, true)
    .setAction(async (args, hre) => {
        let gasTokenAddress = process.env.GAS_TOKEN_ADDRESS;
        if (!gasTokenAddress || gasTokenAddress.length === 0) {
            throw new Error(`invalid GAS_TOKEN_ADDRESS: ${gasTokenAddress}`);
        }
        let gasToken = (await hre.ethers.getContractFactory('GasToken')).attach(gasTokenAddress);
        let tx = await gasToken.externalMintTo(args.to, args.amount);
        console.log(`tx hash: ${tx.hash}`)
        let receipt = await tx.wait();
        for (let event of receipt.events ?? []) {
            console.log(event);
        }
    });

task('gas-token burn', 'burns a gas token')
    .addParam('from', 'address to burn token from', undefined, string, false)
    .addParam('amount', 'amount of token to burn', 1, int, true)
    .setAction(async (args, hre) => {
        let gasTokenAddress = process.env.GAS_TOKEN_ADDRESS;
        if (!gasTokenAddress || gasTokenAddress.length === 0) {
            throw new Error(`invalid GAS_TOKEN_ADDRESS: ${gasTokenAddress}`);
        }
        let gasToken = (await hre.ethers.getContractFactory('GasToken')).attach(gasTokenAddress);
        let tx = await gasToken.externalBurnFrom(args.from, args.amount);
        let receipt = await tx.wait();
        console.log(`tx hash: ${tx.hash}`)
        for (let event of receipt.events ?? []) {
            console.log(event);
        }
    });
    
task('gas-token set-admin', 'sets admin')
    .addParam('address', 'address of the new admin', undefined, string, false)
    .setAction(async (args, hre) => {
        let gasTokenAddress = process.env.GAS_TOKEN_ADDRESS;
        if (!gasTokenAddress || gasTokenAddress.length === 0) {
            throw new Error(`invalid GAS_TOKEN_ADDRESS: ${gasTokenAddress}`);
        }
        let gasToken = (await hre.ethers.getContractFactory('GasToken')).attach(gasTokenAddress);
        await (await gasToken.setAdmin(args.address)).wait();
    });