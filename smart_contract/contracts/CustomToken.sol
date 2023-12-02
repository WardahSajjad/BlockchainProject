// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract UserCustomTokenFactory {
    struct UserToken {
        string name;
        string description;
        address tokenAddress;
    }

    UserToken[] public userTokens;

    event UserTokenCreated(
        address indexed tokenAddress,
        address indexed owner,
        string name,
        string description
    );

    function createUserToken(string memory name, string memory description) public {
        CustomToken customToken = new CustomToken(name, "SYM"); // Customize the symbol as needed
        userTokens.push(UserToken(name, description, address(customToken)));
        customToken.transfer(msg.sender, 1000000 * (10**uint256(customToken.decimals()))); // Initial supply
        emit UserTokenCreated(address(customToken), msg.sender, name, description);
    }

    function getUserTokensCount() public view returns (uint256) {
        return userTokens.length;
    }
}

contract CustomToken is ERC20 {
    constructor(string memory name, string memory symbol)
        ERC20(name, symbol)
    {
        _mint(msg.sender, 1000000 * (10**uint256(decimals())));
    }
}
