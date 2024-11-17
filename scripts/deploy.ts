const hre = require("hardhat");
const { ethers } = require("hardhat");

const userArray = [
  "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  "0xac92D6DB8938fb35bcF9D454DB7741aB3E42b02d",
  "0xcE51815A081421F1937c6e948a604190C70C0337",
  "0x6c414Bc4237f44e3476E8E90f1e266A15a2Ea342",
  "0xb94219f1e9A7dFd99ea8Fb3199e3c9cfe337e1F3",
  "0x9eE5c391E0b114c8A094c71273351623cb6d863F",
  "0x7Caf8A6fb5cd59977B1BC39b3a238d4C113942CB",
  "0x3faDc93353f56435b9c5EAb2De7Cd8C4D326A893",
  "0x27BC213272D6b3508ca677cB5D7441DE0fEfd218",
  "0xC260D2A8028a97B9e91240eAfCa4264b0A1b2605",
  "0xeD7C8269416f4CC50D3db27D26F74079E518f380",
  "0x038053Ac70E9c62C6FD4C80d488B88d1b78ea63a",
  "0x43d6D40FC854752d05959C495B69bc47Dd59eb12",
  "0x9E14740b0CAE3aA39BaA51FCf0483BaBC70a3937",
  "0xF82e3f7ADfeB3A09b41D32DA9b1A10D605548565",
  "0x14B6A95F0376DDc352e9BB65Ad2Ce357a0ce64Bb",
  "0x0a924893D28c53E35EDbD85834D390049Bc5AC0A",
  "0x33ee32Bcb8708B91dFDa7e97CCB6980E72706c21",
  "0xB27d2e6a3315cE42Ef256C588661B9CAe465F6B8",
  "0x4d214aC64879883159fddEb2E950ad49c116D362",
  "0xa9864591F39258F45096f293b74F5CA2f1e58457",
  "0xBCB5dab5e258698ba14133f5a7ebb3F60aE935b3",
  "0x6D71ddE5409733e654f0CD8Edc7979e54acbF6eD",
  "0x9C6163764D19294Da7C9180Cd7d74bDBD797DEeD",
  "0x980B2AA70A336B11E8Fdd2638Bd3F1f34fa45468",
  "0x117256113f1aB592423098411302413C1A0a09a1",
];

async function main() {
  // Get the contract factory
  const MultiTokenFaucet = await hre.ethers.getContractFactory(
    "MultiTokenFaucet"
  );

  // Get the deployer
  const [deployer] = await ethers.getSigners();

  console.log(
    "Account balance:",
    ethers.formatUnits(await deployer.provider.getBalance(deployer.address), 18)
  );

  // Deploy the contract with the userArray
  const faucet = await MultiTokenFaucet.deploy(userArray);

  // Wait for deployment to finish
  await faucet.waitForDeployment();

  // Get the contract address using getAddress()
  const faucetAddress = await faucet.getAddress();

  console.log("MultiTokenFaucet deployed to:", faucetAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
