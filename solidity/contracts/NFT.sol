// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";

contract NFT is Initializable, ContextUpgradeable, ERC1155Upgradeable {

    mapping(address => bool) _allowedMinters;

    string message;
    
    function initialize(string memory uri) public initializer {
        __ERC1155_init(uri);
        message = "hello";
    }

    modifier onlyAllowedMinters() {
        require(
            _allowedMinters[_msgSender()],
            "Not allowed to mint"
        );
        _;
    }

    function externalMint() external onlyAllowedMinters {
        
    }

    function externalHello() view external returns (string memory) {
        return string.concat("msg: ", message);
    }

    function externalSetHello(string calldata newMessage) external {
        message = newMessage;
    }
}