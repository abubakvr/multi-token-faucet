import { ethers } from "hardhat";
import { FAUCET_ADDRESS } from "../utils/constants";

async function main() {
  const userAddresses = ["0xC33dfA307b180cc26369E1865aCDCE159A2C24a0"];

  const faucet = await ethers.getContractAt(
    "MultiTokenFaucet",
    FAUCET_ADDRESS!
  );

  for (const userAddress of userAddresses) {
    try {
      // Try to format the existing address
      const formattedAddress = ethers.getAddress(userAddress);
      const tx = await faucet.requestTokens(formattedAddress);
      await tx.wait();
      console.log(`Successfully requested tokens for ${formattedAddress}`);
    } catch (error) {
      console.log(`Invalid address replaced with random address: ${error}`);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
