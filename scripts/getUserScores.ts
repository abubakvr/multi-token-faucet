import { ethers } from "hardhat";
import { FAUCET_ADDRESS, tokensToCheck } from "../utils/constants";

async function main() {
  const faucet = await ethers.getContractAt(
    "MultiTokenFaucet",
    FAUCET_ADDRESS!
  );

  const result = await faucet.getAllUsersScores(tokensToCheck);
  console.log(
    `User scores: ${result
      .map((item) => `${item.user}: ${ethers.formatUnits(item.score, 0)}`)
      .join(", ")}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
