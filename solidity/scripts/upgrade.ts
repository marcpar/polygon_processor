import { ethers, upgrades} from "hardhat";

async function main() {
  let nft = await ethers.getContractFactory("NFT");
  let deployResponse = await upgrades.upgradeProxy(process.env.CONTRACT_ADDRESS ?? "", nft);
  await deployResponse.deployed();
  console.log(`Deployed to ${deployResponse.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
