import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  defaultNetwork: 'mumbai',
  networks: {
    "mumbai": {
      url: "https://polygon-testnet-rpc.allthatnode.com:8545",
      chainId: 80001,
      accounts: [process.env.PRIVATE_KEY ?? ""]
    }
  }
};

export default config;
