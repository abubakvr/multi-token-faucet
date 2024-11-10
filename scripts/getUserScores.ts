import { ethers } from "hardhat";
import { FAUCET_ADDRESS } from "../utils/constants";

async function main() {
  const tokenAddresses = [
    "0x28041a8147eB37509BDd8aAFc7006f15E0746bbD",
    "0xc349d33292F4958d5E616035241bE2ab2dE85100",
    "0x0414920Dc0C3Bb615A3d8EAA239D55c4258AAae0",
    "0x2d5246fcC20Df5Cdf5346254702a7cBD77E7DBC3",
  ];

  const faucet = await ethers.getContractAt(
    "MultiTokenFaucet",
    FAUCET_ADDRESS!
  );

  const result = await faucet.getAllUsersScores(tokenAddresses);
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
