import { ethers } from "hardhat";

export const FAUCET_ADDRESS = process.env.DEPLOYED_ADDRESS;

export const WETH_PRICE_FEED = "0xE831DFd1DDFCce163c0B16B35aD2dc411129EC7d"; // WETH, USDC, DAI

export const USDC_CB_PRICE_FEED = "0xE831DFd1DDFCce163c0B16B35aD2dc411129EC7d"; // USDC, cbBTC, cbETH

export const ETH_DEFI_PRICE_FEED = "0xE831DFd1DDFCce163c0B16B35aD2dc411129EC7d"; // USDC, COMP, UNI, AAVE

export const CHEDDA_PRICE_FEED = "0x4f69E2b5c3a93F33932e0faFAb3B516510aa5ab6"; // CHEDDA

export const tokens = [
  {
    address: "0x28041a8147eB37509BDd8aAFc7006f15E0746bbD", // CHEDDA
    amount: ethers.parseUnits("30", 18),
    faucetAmount: ethers.parseUnits("0.05", 18),
    priceFeed: CHEDDA_PRICE_FEED,
  },
  {
    address: "0xc349d33292F4958d5E616035241bE2ab2dE85100", // USDC
    amount: ethers.parseUnits("30", 6),
    faucetAmount: ethers.parseUnits("0.02", 6),
    priceFeed: WETH_PRICE_FEED, // USDC is in WETH_PRICE_FEED
  },
  {
    address: "0xF6eea61d35B5A1DdCF7071eC7d5F6a62d649143b", // DAI
    amount: ethers.parseUnits("30", 18),
    faucetAmount: ethers.parseUnits("0.05", 18),
    priceFeed: WETH_PRICE_FEED, // DAI is in WETH_PRICE_FEED
  },
  {
    address: "0x2F59Dd801e498a4E80454cbf022313eAB7C5d511", // WETH
    amount: ethers.parseUnits("4", 18),
    faucetAmount: ethers.parseUnits("0.006", 18),
    priceFeed: WETH_PRICE_FEED,
  },
  {
    address: "0xF1cF6113d2f6B44Bffa7C44D82640Db4e721B48a", // cbETH
    amount: ethers.parseUnits("4", 18),
    faucetAmount: ethers.parseUnits("0.006", 18),
    priceFeed: USDC_CB_PRICE_FEED,
  },
  {
    address: "0x1bf0aeb4C1A1C0896887814d679defcc1325EdE3", // cbBTC
    amount: ethers.parseUnits("0.2", 8),
    faucetAmount: ethers.parseUnits("0.0005", 8),
    priceFeed: USDC_CB_PRICE_FEED,
  },
  {
    address: "0x0414920Dc0C3Bb615A3d8EAA239D55c4258AAae0", // AAVE
    amount: ethers.parseUnits("10", 18),
    faucetAmount: ethers.parseUnits("0.02", 18),
    priceFeed: ETH_DEFI_PRICE_FEED,
  },
  {
    address: "0xC58bb755381C43FC8A9505fFa7C44d8737203300", // COMP
    amount: ethers.parseUnits("10", 18),
    faucetAmount: ethers.parseUnits("0.02", 18),
    priceFeed: ETH_DEFI_PRICE_FEED,
  },
  {
    address: "0x8166D0DeFb96900075a667FFb099DE8A493A4DfD", // UNI
    amount: ethers.parseUnits("10", 18),
    faucetAmount: ethers.parseUnits("0.02", 18),
    priceFeed: ETH_DEFI_PRICE_FEED,
  },
];

export const tokensToCheck = [
  // {
  //   addressToCheck: "0x28041a8147eB37509BDd8aAFc7006f15E0746bbD", // CHEDDA
  //   priceFeed: CHEDDA_PRICE_FEED,
  // },
  // {
  //   addressToCheck: "0xc349d33292F4958d5E616035241bE2ab2dE85100", // USDC
  //   priceFeed: WETH_PRICE_FEED, // USDC is in WETH_PRICE_FEED
  // },
  // {
  //   addressToCheck: "0xF6eea61d35B5A1DdCF7071eC7d5F6a62d649143b", // DAI
  //   priceFeed: WETH_PRICE_FEED, // DAI is in WETH_PRICE_FEED
  // },
  // {
  //   addressToCheck: "0x2F59Dd801e498a4E80454cbf022313eAB7C5d511", // WETH
  //   priceFeed: WETH_PRICE_FEED,
  // },
  // {
  //   addressToCheck: "0xF1cF6113d2f6B44Bffa7C44D82640Db4e721B48a", // cbETH
  //   priceFeed: USDC_CB_PRICE_FEED,
  // },
  // {
  //   addressToCheck: "0x1bf0aeb4C1A1C0896887814d679defcc1325EdE3", // cbBTC
  //   priceFeed: USDC_CB_PRICE_FEED,
  // },
  // {
  //   addressToCheck: "0x0414920Dc0C3Bb615A3d8EAA239D55c4258AAae0", // AAVE
  //   priceFeed: ETH_DEFI_PRICE_FEED,
  // },
  // {
  //   addressToCheck: "0xC58bb755381C43FC8A9505fFa7C44d8737203300", // COMP
  //   priceFeed: ETH_DEFI_PRICE_FEED,
  // },
  // {
  //   addressToCheck: "0x8166D0DeFb96900075a667FFb099DE8A493A4DfD", // UNI
  //   priceFeed: ETH_DEFI_PRICE_FEED,
  // },
  // {
  //   addressToCheck: "0x3153dE50b45868fF2B8bf38C6A29B8822e35c771", // chWETH
  //   priceFeed: WETH_PRICE_FEED, // USDC is in WETH_PRICE_FEED
  // },
];

export const lpTokens = [
  {
    lpToken: "0x3153dE50b45868fF2B8bf38C6A29B8822e35c771",
    asset: "0x2F59Dd801e498a4E80454cbf022313eAB7C5d511",
    priceFeed: WETH_PRICE_FEED,
  },
  {
    lpToken: "0x0fFD5fB4B3160A2709E120A7484AEE03500c55b3",
    asset: "0xc349d33292F4958d5E616035241bE2ab2dE85100",
    priceFeed: USDC_CB_PRICE_FEED,
  },
  {
    lpToken: "0x2c01212f051A59D88A1361db1E2041896dB4af64",
    asset: "0xc349d33292F4958d5E616035241bE2ab2dE85100",
    priceFeed: ETH_DEFI_PRICE_FEED,
  },
];
