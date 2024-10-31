const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
  // Set the initial faucet portion (percentage) and cooldown period (in seconds)
  const faucetPortion = BigInt("50000000000000000000"); // 50 of each token’s balance to distribute per request
  const cooldownPeriod = 3600; // 1 hour cooldown period

  // Get the contract factory
  const UniformMultiTokenFaucet = await hre.ethers.getContractFactory(
    "MultiTokenFaucet"
  );

  // Get the deployer
  const [deployer] = await ethers.getSigners();

  console.log(
    "Account balance:",
    ethers.formatUnits(await deployer.provider.getBalance(deployer.address), 18)
  );

  // Deploy the contract with the faucet portion and cooldown period
  const faucet = await UniformMultiTokenFaucet.deploy(
    faucetPortion,
    cooldownPeriod
  );

  // Wait for deployment to finish
  await faucet.waitForDeployment();

  // Get the contract address using getAddress()
  const faucetAddress = await faucet.getAddress();

  console.log("UniformMultiTokenFaucet deployed to:", faucetAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
