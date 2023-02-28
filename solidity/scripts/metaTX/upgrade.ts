import { ethers, upgrades } from "hardhat";

async function main() {
  let metaTX = await ethers.getContractFactory("MetaTX");
  let deployResponse = await upgrades.upgradeProxy('0x281eF3837672cF2d0e57a56123416e332A82a168', metaTX);
  await deployResponse.deployed();
  console.log(`Deployed to ${deployResponse.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
