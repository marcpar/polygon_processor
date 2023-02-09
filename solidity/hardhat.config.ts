import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
import { string } from "hardhat/internal/core/params/argumentTypes";
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


task('isAllowed', 'checks if the address is allowed to mint')
  .addParam('address', 'address to check', undefined, string, false)
  .setAction(async (args, hre) => {
    const tokenFactory = await hre.ethers.getContractFactory('Token');
    let token = tokenFactory.attach(process.env.PROXY_ADDRESS as string);
    let isAllowed = await token.isAllowedToMint(args.address);
    console.log(isAllowed);
  });

task('mintNFT', 'mints an nft')
  .addParam('tokenUri', 'uri of the token', undefined, string, false)
  .setAction(async (args, hre) => {
    const tokenFactory = await hre.ethers.getContractFactory('Token');
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
    const tokenFactory = await hre.ethers.getContractFactory('Token');
    let token = tokenFactory.attach(process.env.PROXY_ADDRESS as string);
    let uri = await token.uri(args.tokenId);
    console.log(uri);
  });

export default config;
