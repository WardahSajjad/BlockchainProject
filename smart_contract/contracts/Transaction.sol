// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TransactionContract is ERC20 {
    struct Transaction {
        address from;
        address to;
        uint256 amount;
        uint256 timestamp;
    }

    Transaction[] private _transactionHistory;

    constructor(string memory name, string memory symbol)
        ERC20(name, symbol)
    {
        _mint(msg.sender, 1000000 * (10**uint256(decimals())));
    }

    // Function to check the token balance of a specific address
    function checkBalance(address account) public view returns (uint256) {
        return balanceOf(account);
    }

    // Function to transfer tokens to another address
    function transferTokens(address to, uint256 amount) public {
        require(to != address(0), "ERC20: transfer to the zero address");
        require(balanceOf(msg.sender) >= amount, "ERC20: insufficient balance");

        _transfer(msg.sender, to, amount);

        _transactionHistory.push(Transaction({
            from: msg.sender,
            to: to,
            amount: amount,
            timestamp: block.timestamp
        }));
    }

    // Function to view transaction history
    function getTransactionHistory(address user) public view returns (Transaction[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < _transactionHistory.length; i++) {
            if (_transactionHistory[i].from == user || _transactionHistory[i].to == user) {
                count++;
            }
        }

        Transaction[] memory userTransactions = new Transaction[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < _transactionHistory.length; i++) {
            if (_transactionHistory[i].from == user || _transactionHistory[i].to == user) {
                userTransactions[index++] = _transactionHistory[i];
            }
        }
        return userTransactions;
    }
}
