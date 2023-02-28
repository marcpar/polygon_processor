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
      url: "https://polygon-testnet-rpc.allthatnode.com:8545",
      chainId: 80001,
      accounts: [
        process.env.PRIVATE_KEY ?? "0x0000000000000000000000000000000000000000000000000000000000000000",
        process.env.PRIVATE_KEY_NO_BALANCE ?? "0x0000000000000000000000000000000000000000000000000000000000000000"
      ]
    }
  }
};

export default config;
