# MultiTokenFaucet Contract

The `MultiTokenFaucet` contract provides a simple way to distribute ERC20 tokens to users in fixed amounts while enforcing cooldown periods, gas requirements, and user tracking. This faucet supports up to 10 ERC20 tokens, ensuring recipients receive a pre-specified portion per claim, with optional ETH for gas fees.

---

## Features

- **Multi-Token Support**: Allows up to 10 different ERC20 tokens for distribution.
- **Configurable Parameters**: Adjustable faucet amount, cooldown period, and gas parameters.
- **Gas Funding**: Provides ETH to recipients for gas, ensuring successful token transfers.
- **Owner Controls**: Only the owner can add/remove tokens, deposit/withdraw tokens and ETH, and configure settings.
- **Pause Functionality**: Contract can be paused/unpaused to temporarily stop token distributions.

## Contract Overview

### Variables

- `faucetAmount`: Amount of each token to distribute per request.
- `cooldownPeriod`: Time between each request allowed for a user.
- `gasLimit` and `gasPrice`: Define ETH provided per transfer for gas.
- `tokenAddresses`: Stores addresses of supported ERC20 tokens.
- `paused`: Controls whether token requests are allowed.
- `hasReceived`: Tracks if a user has received tokens.
- `lastClaimTime`: Stores the last request time for each user.

### Events

- **TokenAdded**: Emitted when a new token is added.
- **TokenRemoved**: Emitted when a token is removed.
- **TokensDeposited**: Emitted when tokens are deposited.
- **TokensRequested**: Emitted when a user requests tokens.
- **TokensWithdrawn**: Emitted when tokens are withdrawn.
- **ETHDeposited**: Emitted when ETH is deposited.
- **ETHWithdrawn**: Emitted when ETH is withdrawn.
- **HasReceivedReset**: Emitted when a user's status is reset.
- **FaucetPaused**: Emitted when the faucet is paused.
- **FaucetUnpaused**: Emitted when the faucet is unpaused.

## Functions

### Owner Functions

- **setGasParameters**: Sets the `gasLimit` and `gasPrice` for ETH transfers.
- **depositTokens**: Adds a token to the faucet and deposits it.
- **removeToken**: Removes a token from the faucet.
- **withdrawTokens**: Withdraws a specified amount of tokens to the owner.
- **withdrawETH**: Withdraws a specified amount of ETH to the owner.
- **pause/unpause**: Pauses or resumes token requests.
- **setFaucetAmount**: Sets the faucet distribution amount.

### User Functions

- **requestTokens**: Sends tokens to the recipient, including ETH for gas. Requires cooldown period.
- **resetHasReceived**: Resets a user's eligibility to request tokens.

---

## Deployment Instructions

1. **Compile and Deploy**: Compile the contract with a Solidity version compatible with `^0.8.27`.
2. **Configure Parameters**: Set initial values for `faucetAmount` and `cooldownPeriod`.
3. **Add Tokens**: Use `depositTokens` with token addresses and amounts to fund the faucet.

## Usage Guide

1. **Token Request**: Users call `requestTokens`, receiving tokens and ETH for gas if eligible.
2. **Manage Token and ETH Balances**: Owner can add/remove tokens and withdraw tokens or ETH as needed.
3. **Pause or Resume**: Use `pause` or `unpause` to control availability.

---

## Security Considerations

- **Gas Limits**: Ensure sufficient ETH is funded for smooth transactions.
- **Cooldown Enforcement**: Prevents repeated claims in a short period.
- **Token Limit**: Maximum 10 tokens to avoid excessive gas fees per request.
