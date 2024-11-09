import { ethers } from "hardhat";
import { FAUCET_ADDRESS } from "../utils/constants";

async function main() {
  // Token addresses and amounts to deposit (replace with actual addresses and amounts)
  const tokenAddresses = [
    "0x28041a8147eB37509BDd8aAFc7006f15E0746bbD",
    "0xc349d33292F4958d5E616035241bE2ab2dE85100",
    "0x0414920Dc0C3Bb615A3d8EAA239D55c4258AAae0",
    "0x2d5246fcC20Df5Cdf5346254702a7cBD77E7DBC3",
  ];

  const amounts = [
    ethers.parseUnits("20", 18),
    ethers.parseUnits("30", 6),
    ethers.parseUnits("10", 18),
    ethers.parseUnits("20", 18),
  ];

  const faucetAmounts = [
    ethers.parseUnits("2", 18),
    ethers.parseUnits("3", 6),
    ethers.parseUnits("1", 18),
    ethers.parseUnits("2", 18),
  ];

  // Validate arrays have matching lengths
  if (
    tokenAddresses.length !== amounts.length ||
    tokenAddresses.length !== faucetAmounts.length
  ) {
    throw new Error(
      "Token addresses, amounts, and faucet amounts arrays must have the same length"
    );
  }

  // Get the faucet contract
  const faucet = await ethers
    .getContractAt("MultiTokenFaucet", FAUCET_ADDRESS!)
    .catch((error) => {
      throw new Error(`Failed to connect to faucet contract: ${error.message}`);
    });

  for (let i = 0; i < tokenAddresses.length; i++) {
    try {
      // Get the ERC20 token contract
      const token = await ethers.getContractAt("IERC20", tokenAddresses[i]);

      console.log(`Processing token ${tokenAddresses[i]}`);

      // Check token balance before approval
      const balance = await token.balanceOf(
        await (await ethers.provider.getSigner()).getAddress()
      );
      if (balance < amounts[i]) {
        throw new Error(`Insufficient balance for token ${tokenAddresses[i]}`);
      }

      // Approve the faucet to spend tokens
      console.log("Approving tokens...");
      const approveTx = await token.approve(
        await faucet.getAddress(),
        amounts[i]
      );
      await approveTx.wait();
      console.log("Approval complete");

      // Deposit tokens into the faucet
      console.log("Depositing tokens...");
      const depositTx = await faucet.depositTokens(
        tokenAddresses[i],
        amounts[i],
        faucetAmounts[i]
      );
      await depositTx.wait();
      console.log(
        `Successfully deposited ${ethers.formatUnits(amounts[i], 18)} tokens`
      );
    } catch (error) {
      console.error(`Error processing token ${tokenAddresses[i]}:`, error);
      throw error; // Re-throw to stop the script
    }
  }

  console.log("All tokens have been approved and deposited!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
