// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract MetaTX is Initializable, ContextUpgradeable {
    address private _admin;
    address private _trustedForwarder;

    event SayHelloForFree(address, string);

    function _msgSender()
        internal
        view
        virtual
        override
        returns (address sender)
    {
        if (isTrustedForwarder(msg.sender)) {
            // The assembly code is more direct than the Solidity version using `abi.decode`.
            /// @solidity memory-safe-assembly
            assembly {
                sender := shr(96, calldataload(sub(calldatasize(), 20)))
            }
        } else {
            return super._msgSender();
        }
    }

    function _msgData()
        internal
        view
        virtual
        override
        returns (bytes calldata)
    {
        if (isTrustedForwarder(msg.sender)) {
            return msg.data[:msg.data.length - 20];
        } else {
            return super._msgData();
        }
    }

    modifier onlyAdmin() {
        require(_msgSender() == _admin, "Requires admin account");
        _;
    }

    function setAdmin(address admin) public onlyAdmin {
        _admin = admin;
    }

    function setTrustedForwarder(address forwarder) public onlyAdmin {
        _trustedForwarder = forwarder;
    }

    function isTrustedForwarder(address forwarder) public view returns (bool) {
        return forwarder == _trustedForwarder;
    }

    function initialize(
        address admin,
        address trustedForwarder
    ) public initializer {
        _admin = admin;
        setTrustedForwarder(trustedForwarder);
    }

    function sayHello(string calldata message) external {
        emit SayHelloForFree(_msgSender(), message);
    }
}
