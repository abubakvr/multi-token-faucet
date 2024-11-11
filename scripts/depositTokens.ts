import { ethers } from "hardhat";
import { FAUCET_ADDRESS, tokens } from "../utils/constants";

async function main() {
  // Validate arrays have matching lengths
  if (!tokens) {
    throw new Error("Provide tokens array");
  }

  // Get the faucet contract
  const faucet = await ethers
    .getContractAt("MultiTokenFaucet", FAUCET_ADDRESS!)
    .catch((error) => {
      throw new Error(`Failed to connect to faucet contract: ${error.message}`);
    });

  for (let i = 0; i < tokens.length; i++) {
    try {
      // Get the ERC20 token contract
      const token = await ethers.getContractAt("IERC20", tokens[i].address);

      console.log(`Processing token ${tokens[i].address}`);

      // Check token balance before approval
      const balance = await token.balanceOf(
        await (await ethers.provider.getSigner()).getAddress()
      );
      if (balance < tokens[i].amount) {
        throw new Error(`Insufficient balance for token ${tokens[i].address}`);
      }

      // Approve the faucet to spend tokens
      console.log("Approving tokens...");
      const approveTx = await token.approve(
        await faucet.getAddress(),
        tokens[i].amount
      );
      await approveTx.wait();
      console.log("Approval complete");

      // Deposit tokens into the faucet
      console.log("Depositing tokens...");
      const depositTx = await faucet.depositTokens(
        tokens[i].address,
        tokens[i].amount,
        tokens[i].faucetAmount
      );
      await depositTx.wait();
      console.log(
        `Successfully deposited ${ethers.formatUnits(
          tokens[i].amount,
          18
        )} tokens`
      );
    } catch (error) {
      console.error(`Error processing token ${tokens[i].address}:`, error);
      throw error; // Re-throw to stop the script
    }
  }

  console.log("All tokens have been approved and deposited!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
