# MultiTokenFaucet Contract

The `MultiTokenFaucet` contract provides a simple way to distribute ERC20 tokens to users in fixed amounts while enforcing cooldown periods, gas requirements, and user tracking. This faucet supports up to 10 ERC20 tokens, ensuring recipients receive a pre-specified portion per claim, with optional ETH for gas fees.

---

## Features

- **Multi-Token Support**: Allows up to 10 different ERC20 tokens for distribution.
- **Configurable Parameters**: Adjustable faucet amount, cooldown period, and gas parameters.
- **Gas Funding**: Provides ETH to recipients for gas, ensuring successful token transfers.
- **Owner Controls**: Only the owner can add/remove tokens, deposit/withdraw tokens and ETH, and configure settings.
- **Pause Functionality**: Contract can be paused/unpaused to temporarily stop token distributions.

---

## Deployment Instructions

1. **Compile and Deploy**: Compile the contract with a Solidity version compatible with `^0.8.27`.
2. **Configure Parameters**: Set initial values for `faucetAmount` and `cooldownPeriod`.
3. **Add Tokens**: Use `depositTokens` with token addresses and amounts to fund the faucet.

## Usage Guide

1. **Token Request**: Users call `requestTokens`, receiving tokens and ETH for gas if eligible.
2. **Manage Token and ETH Balances**: Owner can add/remove tokens and withdraw tokens or ETH as needed.
3. **Pause or Resume**: Use `pause` or `unpause` to control availability.
