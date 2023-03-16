import { ethers, upgrades } from "hardhat";

async function main() {
  let contractAddress = process.env.MULTI_TOKEN_ADDRESS;
  if (!contractAddress || contractAddress.length === 0) {
    throw new Error(`invalid MULTI_TOKEN_ADDRESS: ${contractAddress}`);
  }

  let nft = await ethers.getContractFactory("MultiToken");

  let deployResponse = await upgrades.upgradeProxy(contractAddress, nft);
  await deployResponse.deployed();
  console.log(`Deployed to ${deployResponse.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
