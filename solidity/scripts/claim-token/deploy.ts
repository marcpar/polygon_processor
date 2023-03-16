import { ethers, upgrades } from "hardhat";

async function main() {
  let initialAdminAddress = process.env.WALLET_ADDRESS;
  if (!initialAdminAddress || initialAdminAddress.length === 0) {
    throw new Error(`invalid WALLET_ADDRESS: ${initialAdminAddress}`);
  }

  let trustedForwarderAddress = process.env.TRUSTED_FORWARDER_ADDRESS;
  if (!trustedForwarderAddress || trustedForwarderAddress.length === 0) {
    throw new Error(`invalid TRUSTED_FORWARDER_ADDRESS: ${trustedForwarderAddress}`);
  }

  let gasTokenAddress = process.env.GAS_TOKEN_ADDRESS;
  if (!gasTokenAddress || gasTokenAddress.length === 0) {
    throw new Error(`invalid GAS_TOKEN_ADDRESS: ${gasTokenAddress}`);
  }

  let claimToken = await ethers.getContractFactory("ClaimToken");
  let deployResponse = await upgrades.deployProxy(claimToken, [initialAdminAddress, trustedForwarderAddress, gasTokenAddress], {
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
