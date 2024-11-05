// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract MultiTokenFaucet {
    address public owner;
    uint256 public faucetAmount; // The amount of each token to distribute
    address[] public tokenAddresses;
    uint256 public constant MAX_TOKENS = 10;

    // Struct to store information about each token
    struct TokenInfo {
        IERC20 token;
    }

    // Mapping of token addresses to their info
    mapping(address => TokenInfo) public tokens;

    // Mapping to track if an address has received tokens
    mapping(address => bool) public hasReceived;

    // Cooldown period in seconds
    uint256 public cooldownPeriod;

    // Mapping to track last claim time for each user
    mapping(address => uint256) public lastClaimTime;

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

    // Event for user's hasReceived status reset
    event HasReceivedReset(address indexed user);

    // Event for faucet paused
    event FaucetPaused();

    // Event for faucet unpaused
    event FaucetUnpaused();

    event ETHDeposited(uint256 amount);
    event ETHWithdrawn(uint256 amount);

    // Flag to indicate if the faucet is paused
    bool public paused;

    constructor(uint256 _faucetAmount, uint256 _cooldownPeriod) {
        require(
            _faucetAmount > 0 && _faucetAmount <= 500 * 1e18,
            "Invalid faucet portion"
        );
        require(_cooldownPeriod > 0, "Invalid cooldown period");
        owner = msg.sender;
        faucetAmount = _faucetAmount;
        cooldownPeriod = _cooldownPeriod;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    receive() external payable {
        emit ETHDeposited(msg.value);
    }

    // Deposit tokens into the faucet contract and add it to the token list
    function depositTokens(
        address tokenAddress,
        uint256 amount
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
        tokens[tokenAddress] = TokenInfo({token: IERC20(tokenAddress)});
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

    // User function to request tokens
    function requestTokens(address recipient) external {
        require(!paused, "Faucet is paused");
        require(recipient != address(0), "Invalid recipient address");
        require(
            !hasReceived[recipient] ||
                block.timestamp >= lastClaimTime[recipient] + cooldownPeriod,
            "Cooldown period not yet passed"
        );

        // Update state first
        hasReceived[recipient] = true;
        lastClaimTime[recipient] = block.timestamp;

        uint256 totalAmount = 0;

        // Perform transfers after state updates
        for (uint i = 0; i < tokenAddresses.length; i++) {
            address tokenAddress = tokenAddresses[i];
            TokenInfo storage tokenInfo = tokens[tokenAddress];
            uint256 balance = tokenInfo.token.balanceOf(address(this));

            if (balance > 0 && balance >= 5 ether) {
                require(
                    tokenInfo.token.transfer(recipient, faucetAmount),
                    "Token transfer failed"
                );
                totalAmount += faucetAmount;
            }
        }

        emit TokensRequested(recipient, totalAmount);
    }

    // Reset a user's hasReceived status
    function resetHasReceived(address user) external onlyOwner {
        hasReceived[user] = false;
        emit HasReceivedReset(user);
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

    // Function to edit the faucet amount
    function setFaucetAmount(uint256 _faucetAmount) external onlyOwner {
        require(
            _faucetAmount > 0 && _faucetAmount <= 500 * 1e18,
            "Invalid faucet portion"
        );
        faucetAmount = _faucetAmount;
    }
}
