// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract GenesisBot {
    address public owner;

    constructor(address _owner) {
        owner = _owner;
    }

    function sayHello() public pure returns (string memory) {
        return "Hello, I am a Genesis Bot!";
    }
}
