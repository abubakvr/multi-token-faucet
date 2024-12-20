// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

interface IERC4626 {
    function convertToAssets(uint256 shares) external view returns (uint256);
}
