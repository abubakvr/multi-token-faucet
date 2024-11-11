import { ethers } from "hardhat";
import { FAUCET_ADDRESS } from "../utils/constants";

async function main() {
  const userAddresses = [
    "0xC33dfA307b180cc26369E1865aCDCE159A2C24a0",
    "0xf2cCCF02c83b43611Bad089aDB18E69C92a6A0cE",
    // "0x5670CCC0C7CDD41284EC93E5111fF1ca924054dD",
    // "0x9958e5Cf40Ca8150e294cdc53fdA096587b1B3d5",
    // "0x9bE875B90b41EF1629Ddc7aBb3677B6E92Bd6cDb",
  ];

  const faucet = await ethers.getContractAt(
    "MultiTokenFaucet",
    FAUCET_ADDRESS!
  );

  for (const userAddress of userAddresses) {
    const tx = await faucet.requestTokens(userAddress);
    await tx.wait();
    console.log(`Successfully requested tokens for ${userAddress}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
