// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.20;

interface IStakingPool {
    /// @notice Returns the staking balance of a given account.
    /// @param account The account to return staking balance for.
    /// @return The amount staked by account
    function stakingBalance(address account) external view returns (uint256);
}
