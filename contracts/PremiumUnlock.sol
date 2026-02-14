// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title PremiumUnlock
 * @dev Simple contract to handle premium feature unlocks for ONEXA
 */
contract PremiumUnlock {
    // Unlock price in wei (0.00001 sFUEL = 10000000000000 wei)
    uint256 public constant UNLOCK_PRICE = 0.00001 ether;
    
    // Owner of the contract
    address public owner;
    
    // Mapping to track unlocked users
    mapping(address => bool) public hasUnlocked;
    
    // Mapping to track unlock timestamps
    mapping(address => uint256) public unlockTimestamp;
    
    // Events
    event Unlocked(address indexed user, uint256 amount, uint256 timestamp);
    event Withdrawn(address indexed owner, uint256 amount);
    
    constructor() {
        owner = msg.sender;
    }
    
    /**
     * @dev Unlock premium features by sending payment
     */
    function unlock() external payable {
        require(msg.value >= UNLOCK_PRICE, "Insufficient payment");
        require(!hasUnlocked[msg.sender], "Already unlocked");
        
        hasUnlocked[msg.sender] = true;
        unlockTimestamp[msg.sender] = block.timestamp;
        
        emit Unlocked(msg.sender, msg.value, block.timestamp);
        
        // Refund excess payment
        if (msg.value > UNLOCK_PRICE) {
            payable(msg.sender).transfer(msg.value - UNLOCK_PRICE);
        }
    }
    
    /**
     * @dev Check if an address has unlocked premium features
     */
    function isUnlocked(address user) external view returns (bool) {
        return hasUnlocked[user];
    }
    
    /**
     * @dev Get unlock details for a user
     */
    function getUnlockDetails(address user) external view returns (bool unlocked, uint256 timestamp) {
        return (hasUnlocked[user], unlockTimestamp[user]);
    }
    
    /**
     * @dev Owner can withdraw collected funds
     */
    function withdraw() external {
        require(msg.sender == owner, "Only owner can withdraw");
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        payable(owner).transfer(balance);
        emit Withdrawn(owner, balance);
    }
    
    /**
     * @dev Get contract balance
     */
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
