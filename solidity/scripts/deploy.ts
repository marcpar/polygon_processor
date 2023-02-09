import { ethers, upgrades} from "hardhat";

async function main() {
  let nft = await ethers.getContractFactory("Token");
  let deployResponse = await upgrades.deployProxy(nft, [process.env.ALLOWED_ADDRESS ?? ""], {
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
