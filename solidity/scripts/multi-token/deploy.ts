import { ethers, upgrades } from "hardhat";

async function main() {
  let initialAdminAddress = process.env.WALLET_ADDRESS;
  if (!initialAdminAddress || initialAdminAddress.length === 0) {
    throw new Error(`invalid WALLET_ADDRESS: ${initialAdminAddress}`);
  }

  let nft = await ethers.getContractFactory("MultiToken");
  let deployResponse = await upgrades.deployProxy(nft, [initialAdminAddress], {
    initializer: 'initialize'
  });
  await deployResponse.deployed();

  console.log(`Deployed to ${deployResponse.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
