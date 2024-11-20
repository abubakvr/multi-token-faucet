// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.20;

/// @notice Enum representing the possible lock times
enum LockTime {
    zero,
    thirtyDays,
    ninetyDays,
    oneEightyDays,
    threeSixtyDays
}

/// @notice The structure that represents an active lock.
struct Lock {
    uint256 amount;
    uint256 timeWeighted;
    uint256 expiry;
    uint256 rewardDebt;
    LockTime lockTime;
}

interface ILockingGauge {
    /// @notice Returns the `Lock` struct for the given account.
    /// @dev Note: A `Lock` is always returned by this function.
    /// If a valid lock exists, the `amount` field is non-zero. A zero `amount`
    /// means a valid lock does not exist.
    /// @param account THe account to return the lock for.
    /// @return The lock info.
    function getLock(address account) external view returns (Lock memory);
}
