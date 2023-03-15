import { ethers, upgrades} from "hardhat";

async function main() {
  let claimToken = await ethers.getContractFactory("ClaimToken");
  let deployResponse = await upgrades.deployProxy(claimToken, [process.env.ALLOWED_ADDRESS ?? "", "0x69015912AA33720b842dCD6aC059Ed623F28d9f7"], {
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
