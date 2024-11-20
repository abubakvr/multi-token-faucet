import { ethers } from "hardhat";

export const FAUCET_ADDRESS = process.env.DEPLOYED_ADDRESS;

export const WETH_PRICE_FEED = "0xE831DFd1DDFCce163c0B16B35aD2dc411129EC7d"; // WETH, USDC, DAI

export const USDC_CB_PRICE_FEED = "0xE831DFd1DDFCce163c0B16B35aD2dc411129EC7d"; // USDC, cbBTC, cbETH

export const ETH_DEFI_PRICE_FEED = "0xE831DFd1DDFCce163c0B16B35aD2dc411129EC7d"; // USDC, COMP, UNI, AAVE

export const CHEDDA_PRICE_FEED = "0x4f69E2b5c3a93F33932e0faFAb3B516510aa5ab6"; // CHEDDA

export const tokens = [
  {
    address: "0xAB3ABb5C1B69dC4fFe6B6FA0D633DD436E1639c2", // CHEDDA
    amount: ethers.parseUnits("60000", 18),
    faucetAmount: ethers.parseUnits("10000", 18),
    priceFeed: CHEDDA_PRICE_FEED,
  },
  {
    address: "0xc349d33292F4958d5E616035241bE2ab2dE85100", // USDC
    amount: ethers.parseUnits("60000", 6),
    faucetAmount: ethers.parseUnits("10000", 6),
    priceFeed: WETH_PRICE_FEED, // USDC is in WETH_PRICE_FEED
  },
  {
    address: "0xF6eea61d35B5A1DdCF7071eC7d5F6a62d649143b", // DAI
    amount: ethers.parseUnits("60000", 18),
    faucetAmount: ethers.parseUnits("10000", 18),
    priceFeed: WETH_PRICE_FEED, // DAI is in WETH_PRICE_FEED
  },
  {
    address: "0x2F59Dd801e498a4E80454cbf022313eAB7C5d511", // WETH
    amount: ethers.parseUnits("60", 18),
    faucetAmount: ethers.parseUnits("10", 18),
    priceFeed: WETH_PRICE_FEED,
  },
  {
    address: "0xF1cF6113d2f6B44Bffa7C44D82640Db4e721B48a", // cbETH
    amount: ethers.parseUnits("60", 18),
    faucetAmount: ethers.parseUnits("10", 18),
    priceFeed: USDC_CB_PRICE_FEED,
  },
  {
    address: "0x1bf0aeb4C1A1C0896887814d679defcc1325EdE3", // cbBTC
    amount: ethers.parseUnits("6", 8),
    faucetAmount: ethers.parseUnits("1", 8),
    priceFeed: USDC_CB_PRICE_FEED,
  },
  {
    address: "0x0414920Dc0C3Bb615A3d8EAA239D55c4258AAae0", // AAVE
    amount: ethers.parseUnits("600", 18),
    faucetAmount: ethers.parseUnits("100", 18),
    priceFeed: ETH_DEFI_PRICE_FEED,
  },
  {
    address: "0xC58bb755381C43FC8A9505fFa7C44d8737203300", // COMP
    amount: ethers.parseUnits("600", 18),
    faucetAmount: ethers.parseUnits("100", 18),
    priceFeed: ETH_DEFI_PRICE_FEED,
  },
  {
    address: "0x8166D0DeFb96900075a667FFb099DE8A493A4DfD", // UNI
    amount: ethers.parseUnits("600", 18),
    faucetAmount: ethers.parseUnits("100", 18),
    priceFeed: ETH_DEFI_PRICE_FEED,
  },
];

export const lpTokens = [
  {
    lpToken: "0x2a9dc7463EA224dDCa477296051D95694b0bb05C",
    asset: "0x2F59Dd801e498a4E80454cbf022313eAB7C5d511",
    priceFeed: WETH_PRICE_FEED,
  },
  {
    lpToken: "0x461fb6906dD46e4ED8fA354b3e4E5e7cB102171F",
    asset: "0xc349d33292F4958d5E616035241bE2ab2dE85100",
    priceFeed: USDC_CB_PRICE_FEED,
  },
  {
    lpToken: "0x7e41fF84f262a182C2928D4817220F47eb89aeCc",
    asset: "0xc349d33292F4958d5E616035241bE2ab2dE85100",
    priceFeed: ETH_DEFI_PRICE_FEED,
  },
];
