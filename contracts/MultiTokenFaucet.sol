// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {IERC20} from "./IERC20.sol";
import {IPriceFeed} from "./IPriceFeed.sol";
import {IERC4626} from "./IERC4626.sol";

contract MultiTokenFaucet {
    address public owner;
    address[] public allUsers;
    address[] public tokenAddresses;
    uint256 public constant MAX_TOKENS = 15;
    address public constant ETH_ADDRESS =
        0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;
    uint256 public constant ETH_FAUCET_AMOUNT = 0.01 ether;

    // Struct to store information about each token
    struct TokenInfo {
        IERC20 token;
        uint256 faucetAmount; // The amount of each token to distribute
    }

    struct TokensToCheck {
        address addressToCheck;
        address priceFeed;
    }

    struct UserScore {
        address user;
        uint256 score;
    }

    struct LpTokenInfo {
        address lpToken;
        address asset;
        address priceFeed;
    }

    // Mapping of token addresses to their info
    mapping(address => TokenInfo) public tokens;

    // Mapping to track if an address has received tokens
    mapping(address => bool) public hasReceived;

    // Event for token addition
    event TokenAdded(address indexed tokenAddress);

    // Event for token removal
    event TokenRemoved(address indexed tokenAddress);

    // Event for token deposit
    event TokensDeposited(address indexed tokenAddress, uint256 amount);

    // Event for token request
    event TokensRequested(address indexed user, uint256 amount);

    // Event for token withdrawal
    event TokensWithdrawn(address indexed tokenAddress, uint256 amount);

    // Event for faucet paused
    event FaucetPaused();

    // Event for faucet unpaused
    event FaucetUnpaused();

    event ETHDeposited(uint256 amount);
    event ETHWithdrawn(uint256 amount);

    // Flag to indicate if the faucet is paused
    bool public paused;
    LpTokenInfo[] public lpTokens;

    constructor() {
        owner = msg.sender;

        // Add ETH to tokens list automatically
        tokens[ETH_ADDRESS] = TokenInfo({
            token: IERC20(address(0)), // dummy value for ETH
            faucetAmount: ETH_FAUCET_AMOUNT
        });
        tokenAddresses.push(ETH_ADDRESS);
        emit TokenAdded(ETH_ADDRESS);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    receive() external payable {
        emit ETHDeposited(msg.value);
    }

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}

    // Deposit tokens into the faucet contract and add it to the token list
    function depositTokens(
        address tokenAddress,
        uint256 amount,
        uint256 faucetAmount
    ) external onlyOwner {
        require(tokenAddress != address(0), "Zero address not allowed");
        require(tokenAddresses.length < MAX_TOKENS, "Too many tokens");
        require(
            address(tokens[tokenAddress].token) == address(0),
            "Token already exists"
        );

        // Transfer tokens to the contract
        require(
            IERC20(tokenAddress).transferFrom(
                msg.sender,
                address(this),
                amount
            ),
            "Token deposit failed"
        );

        // Add token to the list
        tokens[tokenAddress] = TokenInfo({
            token: IERC20(tokenAddress),
            faucetAmount: faucetAmount
        });
        tokenAddresses.push(tokenAddress);
        emit TokenAdded(tokenAddress);
        emit TokensDeposited(tokenAddress, amount);
    }

    // Remove a token from the faucet
    function removeToken(address tokenAddress) external onlyOwner {
        require(
            address(tokens[tokenAddress].token) != address(0),
            "Token does not exist"
        );

        // Remove from tokenAddresses array
        for (uint i = 0; i < tokenAddresses.length; i++) {
            if (tokenAddresses[i] == tokenAddress) {
                // Move the last element to the position being deleted
                tokenAddresses[i] = tokenAddresses[tokenAddresses.length - 1];
                // Remove the last element
                tokenAddresses.pop();
                break;
            }
        }

        delete tokens[tokenAddress];
        emit TokenRemoved(tokenAddress);
    }

    function addLPToken(
        address _lpToken,
        address _asset,
        address _priceFeed
    ) external onlyOwner {
        // Check if LP token already exists by iterating through the array
        for (uint i = 0; i < lpTokens.length; i++) {
            require(lpTokens[i].lpToken != _lpToken, "LP Token already exists");
        }

        lpTokens.push(
            LpTokenInfo({
                lpToken: _lpToken,
                asset: _asset,
                priceFeed: _priceFeed
            })
        );
    }

    // User function to request tokens
    function requestTokens(address recipient) external {
        require(!paused, "Faucet is paused");
        require(recipient != address(0), "Invalid recipient address");
        require(!hasReceived[recipient], "Tokens can only be requested once");

        // Update state first
        hasReceived[recipient] = true;
        allUsers.push(recipient);
        uint256 totalAmount = 0;

        // Perform transfers after state updates
        for (uint i = 0; i < tokenAddresses.length; i++) {
            address tokenAddress = tokenAddresses[i];
            TokenInfo storage tokenInfo = tokens[tokenAddress];

            if (tokenAddress == ETH_ADDRESS) {
                uint256 ethBalance = address(this).balance;
                if (ethBalance >= tokenInfo.faucetAmount) {
                    (bool success, ) = payable(recipient).call{
                        value: tokenInfo.faucetAmount
                    }("");
                    require(success, "ETH transfer failed");
                    totalAmount += tokenInfo.faucetAmount;
                }
            } else {
                uint256 balance = tokenInfo.token.balanceOf(address(this));
                if (balance >= tokenInfo.faucetAmount) {
                    require(
                        tokenInfo.token.transfer(
                            recipient,
                            tokenInfo.faucetAmount
                        ),
                        "Token transfer failed"
                    );
                    totalAmount += tokenInfo.faucetAmount;
                }
            }
        }

        emit TokensRequested(recipient, totalAmount);
    }

    // Withdraw tokens by owner if needed
    function withdrawTokens(
        address tokenAddress,
        uint256 amount
    ) external onlyOwner {
        require(
            address(tokens[tokenAddress].token) != address(0),
            "Token does not exist"
        );
        require(amount > 0, "Amount must be greater than 0");
        require(
            tokens[tokenAddress].token.balanceOf(address(this)) >= amount,
            "Insufficient balance"
        );

        require(
            tokens[tokenAddress].token.transfer(owner, amount),
            "Token withdrawal failed"
        );
        emit TokensWithdrawn(tokenAddress, amount);
    }

    // Pause the faucet
    function pause() external onlyOwner {
        paused = true;
        emit FaucetPaused();
    }

    // Unpause the faucet
    function unpause() external onlyOwner {
        paused = false;
        emit FaucetUnpaused();
    }

    // Allow owner to withdraw ETH if needed
    function withdrawETH(uint256 amount) external onlyOwner {
        require(amount <= address(this).balance, "Insufficient ETH balance");
        (bool success, ) = owner.call{value: amount}("");
        require(success, "ETH withdrawal failed");
        emit ETHWithdrawn(amount);
    }

    function getAllUsersScores(
        TokensToCheck[] calldata tokenAddressesToCheck
    ) external view returns (UserScore[] memory) {
        require(
            tokenAddressesToCheck.length <= MAX_TOKENS,
            "Too many tokens to check"
        );

        UserScore[] memory results = new UserScore[](allUsers.length);

        for (uint256 i = 0; i < allUsers.length; i++) {
            address user = allUsers[i];
            uint256 totalScore = 0;

            for (uint256 j = 0; j < tokenAddressesToCheck.length; j++) {
                address tokenAddr = tokenAddressesToCheck[j].addressToCheck;
                if (tokenAddr == ETH_ADDRESS) {
                    continue;
                }
                uint256 balance = IERC20(tokenAddr).balanceOf(user);

                totalScore += _getTokenScore(
                    balance,
                    tokenAddr,
                    tokenAddressesToCheck[j].priceFeed
                );
            }

            // Add LP token scores
            totalScore += _getLPTokenScores(user);

            results[i] = UserScore({user: user, score: totalScore});
        }

        return results;
    }

    // Function to calculate LP token values
    function _getLPTokenScores(address user) internal view returns (uint256) {
        uint256 totalLPTokenScore = 0;

        for (uint256 i = 0; i < lpTokens.length; i++) {
            uint256 lpBalance = IERC20(lpTokens[i].lpToken).balanceOf(user);
            if (lpBalance > 0) {
                uint256 lpAssetValue = IERC4626(lpTokens[i].lpToken)
                    .convertToAssets(lpBalance);

                totalLPTokenScore += _getTokenScore(
                    lpAssetValue,
                    lpTokens[i].asset,
                    lpTokens[i].priceFeed
                );
            }
        }

        return totalLPTokenScore;
    }

    function _getTokenScore(
        uint256 balance,
        address tokenAddr,
        address priceFeed
    ) internal view returns (uint256) {
        if (priceFeed == address(0)) return 0;

        uint8 tokenDecimals = IERC20(tokenAddr).decimals();
        (int256 tokenPrice, ) = IPriceFeed(priceFeed).readPrice(tokenAddr, 0);
        uint8 priceDecimals = IPriceFeed(priceFeed).decimals();

        if (tokenPrice <= 0) return 0;

        return
            _calculateTokenValue(
                balance,
                tokenDecimals,
                tokenPrice,
                priceDecimals
            );
    }

    function _calculateTokenValue(
        uint256 balance,
        uint8 tokenDecimals,
        int256 price,
        uint8 priceDecimals
    ) internal pure returns (uint256) {
        // Normalize to 18 decimals to get the actual token amount
        uint256 actualTokenAmount = balance * (10 ** (18 - tokenDecimals));
        // Multiply by price and divide by price decimals to get USD value
        return (actualTokenAmount * uint256(price)) / (10 ** priceDecimals);
    }

    // Utility function to get total number of users
    function getUserCount() external view returns (uint256) {
        return allUsers.length;
    }
}
