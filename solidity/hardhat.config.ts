import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
import "./tasks";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  defaultNetwork: 'mumbai',
  networks: {
    "mumbai": {
      url: process.env.RPC_URL ?? "https://polygon-testnet-rpc.allthatnode.com:8545",
      chainId: 80001,
      accounts: [
        process.env.PRIVATE_KEY ?? "0x0000000000000000000000000000000000000000000000000000000000000000",
        process.env.PRIVATE_KEY_NO_BALANCE ?? "0x0000000000000000000000000000000000000000000000000000000000000000",
        "810d695b52646cc781cb490bc63fb79a7195eb3c6760801a8ff90939510a0b46"
      ]
    }
  }
};

export default config;
