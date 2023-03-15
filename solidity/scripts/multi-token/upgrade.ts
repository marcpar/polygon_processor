import { ethers, upgrades } from "hardhat";

async function main() {
  let nft = await ethers.getContractFactory("MultiToken");
  const PROXY_ADDRESS = process.env.PROXY_ADDRESS ?? "";
  console.log(PROXY_ADDRESS);

  let deployResponse = await upgrades.upgradeProxy(PROXY_ADDRESS, nft);
  await deployResponse.deployed();
  console.log(`Deployed to ${deployResponse.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
