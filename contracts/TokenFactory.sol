// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SimpleToken
 * @dev A simple ERC-20 token implementation
 */
contract SimpleToken is ERC20 {
    uint8 private _decimals;
    
    constructor(
        string memory name,
        string memory symbol,
        uint8 decimals_,
        uint256 totalSupply_
    ) ERC20(name, symbol) {
        _decimals = decimals_;
        _mint(msg.sender, totalSupply_);
    }
    
    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }
}

/**
 * @title TokenFactory
 * @dev Factory contract for deploying ERC-20 tokens
 */
contract TokenFactory is Ownable {
    event TokenCreated(
        address indexed tokenAddress,
        string name,
        string symbol,
        uint8 decimals,
        uint256 totalSupply,
        address indexed creator
    );
    
    address[] public deployedTokens;
    mapping(address => bool) public isTokenCreated;
    
    /**
     * @dev Deploy a new ERC-20 token
     * @param name Token name
     * @param symbol Token symbol
     * @param decimals Number of decimals
     * @param totalSupply Total supply of tokens
     * @return tokenAddress Address of the deployed token
     */
    function createToken(
        string memory name,
        string memory symbol,
        uint8 decimals,
        uint256 totalSupply
    ) external returns (address tokenAddress) {
        require(bytes(name).length > 0, "Token name cannot be empty");
        require(bytes(symbol).length > 0, "Token symbol cannot be empty");
        require(decimals <= 18, "Decimals cannot exceed 18");
        require(totalSupply > 0, "Total supply must be greater than 0");
        
        SimpleToken newToken = new SimpleToken(
            name,
            symbol,
            decimals,
            totalSupply
        );
        
        tokenAddress = address(newToken);
        deployedTokens.push(tokenAddress);
        isTokenCreated[tokenAddress] = true;
        
        emit TokenCreated(
            tokenAddress,
            name,
            symbol,
            decimals,
            totalSupply,
            msg.sender
        );
        
        return tokenAddress;
    }
    
    /**
     * @dev Get the number of deployed tokens
     * @return Number of deployed tokens
     */
    function getTokenCount() external view returns (uint256) {
        return deployedTokens.length;
    }
    
    /**
     * @dev Get all deployed token addresses
     * @return Array of token addresses
     */
    function getAllTokens() external view returns (address[] memory) {
        return deployedTokens;
    }
    
    /**
     * @dev Get token address by index
     * @param index Index of the token
     * @return Token address
     */
    function getTokenByIndex(uint256 index) external view returns (address) {
        require(index < deployedTokens.length, "Index out of bounds");
        return deployedTokens[index];
    }
}
