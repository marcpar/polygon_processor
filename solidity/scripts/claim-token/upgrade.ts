import { ethers, upgrades } from "hardhat";

async function main() {
  let contractAddress = process.env.CLAIM_TOKEN_ADDRESS;
  if (!contractAddress || contractAddress.length === 0) {
    throw new Error(`invalid CLAIM_TOKEN_ADDRESS: ${contractAddress}`);
  }

  let claimToken = await ethers.getContractFactory("ClaimToken");
  let deployResponse = await upgrades.upgradeProxy(contractAddress, claimToken);
  await deployResponse.deployed();
  console.log(`Deployed to ${deployResponse.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
