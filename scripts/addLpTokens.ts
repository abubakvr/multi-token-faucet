import { ethers } from "hardhat";
import { FAUCET_ADDRESS, lpTokens } from "../utils/constants";

async function main() {
  // Validate arrays have matching lengths
  if (!lpTokens) {
    throw new Error("Provide tokens array");
  }

  // Get the faucet contract
  const faucet = await ethers
    .getContractAt("MultiTokenFaucet", FAUCET_ADDRESS!)
    .catch((error) => {
      throw new Error(`Failed to connect to faucet contract: ${error.message}`);
    });

  for (let i = 0; i < lpTokens.length; i++) {
    try {
      // Add tokens into the lpArray
      console.log("Adding lp tokens...");
      const addLpTokenTx = await faucet.addLPToken(
        lpTokens[i].lpToken,
        lpTokens[i].asset,
        lpTokens[i].priceFeed
      );
      await addLpTokenTx.wait();
      console.log(`Successfully added the lpToken ${lpTokens[i]}`);
    } catch (error) {
      console.error(`Error adding lpToken ${lpTokens[i]}:`, error);
      throw error; // Re-throw to stop the script
    }
  }

  console.log("All lpTokens have been added!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
