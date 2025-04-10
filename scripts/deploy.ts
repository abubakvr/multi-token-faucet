const hre = require("hardhat");
const { ethers } = require("hardhat");

const userArray = ["0x117256113f1aB592423098411302413C1A0a09a1"];

async function main() {
  // Get the contract factory
  const MultiTokenFaucet = await hre.ethers.getContractFactory(
    "MultiTokenFaucet"
  );

  // Get the deployer
  const [deployer] = await ethers.getSigners();

  console.log(
    "Account balance:",
    ethers.formatUnits(await deployer.provider.getBalance(deployer.address), 18)
  );

  // Deploy the contract with the userArray
  const faucet = await MultiTokenFaucet.deploy(userArray);

  // Wait for deployment to finish
  await faucet.waitForDeployment();

  // Get the contract address using getAddress()
  const faucetAddress = await faucet.getAddress();

  console.log("MultiTokenFaucet deployed to:", faucetAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
