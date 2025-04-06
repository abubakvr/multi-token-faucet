import { ethers } from "hardhat";
import { FAUCET_ADDRESS } from "../utils/constants";

async function main() {
  const userAddresses = [
    {
      user: "0xd51F9D7ae995A45e9573f0D62E0137722cB9c649",
    },
  ];

  const faucet = await ethers.getContractAt(
    "MultiTokenFaucet",
    FAUCET_ADDRESS!
  );

  for (const userAddress of userAddresses) {
    try {
      // Try to format the existing address
      const formattedAddress = ethers.getAddress(userAddress.user);
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
