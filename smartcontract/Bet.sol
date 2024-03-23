// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
}

contract Bet {
    address public manager;
    address[] public players;
    mapping(address => uint256) public bets;

    IERC20 public usdc; // USDC token contract address

    modifier onlyManager() {
        require(msg.sender == manager, "Only the manager can call this function");
        _;
    }

    constructor(address _usdcAddress) {
        manager = msg.sender;
        usdc = IERC20(_usdcAddress); // Initialize USDC token contract
    }

    function enter(uint256 amount) public {
        require(amount > 5000000000000000000, "Amount must be greater than 0");
        require(usdc.allowance(msg.sender, address(this)) >= amount, "You must approve the transfer first");

        players.push(msg.sender);
        bets[msg.sender] = amount;

        // Transfer USDC tokens from sender to this contract
        bool success = usdc.transferFrom(msg.sender, address(this), amount);
        require(success, "USDC transfer failed");
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }

    function getPot() public view returns (uint256) {
        uint256 pot = 0;
        for (uint256 i = 0; i < players.length; i++) {
            pot += bets[players[i]];
        }
        return pot;
    }

    function pickWinner() public onlyManager {
        require(players.length > 0, "No players in the pool");
        // Pseudo-randomly select a winner based on the block timestamp
        uint256 index = block.timestamp % players.length;
        address winner = players[index];

        // Transfer the entire pot to the winner
        uint256 pot = getPot();
        bool success = usdc.transfer(winner, pot);
        require(success, "USDC transfer failed");

        // Reset the contract for the next round
        delete players;
    }
}
