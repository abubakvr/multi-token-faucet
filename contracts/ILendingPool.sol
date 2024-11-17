// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

interface ILendingPool {
    function totalAccountCollateralValue(
        address account
    ) external view returns (uint256);
}
