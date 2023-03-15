import { ethers, upgrades} from "hardhat";

async function main() {
  let gasToken = await ethers.getContractFactory("GasToken");
  let deployResponse = await upgrades.deployProxy(gasToken, [process.env.ALLOWED_ADDRESS ?? "", "0x69015912AA33720b842dCD6aC059Ed623F28d9f7"], {
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
