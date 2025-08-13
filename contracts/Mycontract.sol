// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MyContract {
    string public greet;
    constructor(string memory _greet) {
        greet = _greet;
    }
}
