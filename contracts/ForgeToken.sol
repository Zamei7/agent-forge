// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ForgeToken
 * @notice $FORGE governance token for the AgentForge marketplace
 * @dev ERC20 with permit (gasless approvals) and burn capability
 */
contract ForgeToken is ERC20, ERC20Burnable, ERC20Permit, Ownable {
    uint256 public constant MAX_SUPPLY = 1_000_000_000 * 1e18; // 1B tokens
    uint256 public constant STAKING_ALLOCATION = 300_000_000 * 1e18; // 30%
    uint256 public constant ECOSYSTEM_FUND = 250_000_000 * 1e18; // 25%
    uint256 public constant TEAM_ALLOCATION = 200_000_000 * 1e18; // 20%
    uint256 public constant PUBLIC_SALE = 150_000_000 * 1e18; // 15%
    uint256 public constant LIQUIDITY = 100_000_000 * 1e18; // 10%

    constructor(address treasury)
        ERC20("AgentForge", "FORGE")
        ERC20Permit("AgentForge")
        Ownable(treasury)
    {
        _mint(treasury, MAX_SUPPLY);
    }
}
