import { ethers } from "hardhat";
import { FAUCET_ADDRESS } from "../utils/constants";

async function main() {
  const tokenAddresses = [];

  const faucet = await ethers.getContractAt(
    "MultiTokenFaucet",
    FAUCET_ADDRESS!
  );

  const result = await faucet.getAllUsersScores([]);
  console.log(
    `User scores: ${result
      .map((item) => `${item.user}: ${ethers.formatUnits(item.score)}`)
      .join(", ")}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
