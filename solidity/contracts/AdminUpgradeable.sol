// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

/**
 * @title AdminUpgradeable
 *
 * Allow address to manage the contract internally
 *
 */
abstract contract AdminUpgradeable is Initializable {
    /**
     * addresses that are admin
     */
    mapping(address => bool) internal _admins;

    /**
     * Initialize contract
     * @param initAdmin initial admin
     */
    function __AdminUpgradeable_init(address initAdmin) internal initializer {
        _admins[initAdmin] = true;
    }

    /**
     * @dev attach modifier to methods that should require admin
     */
    modifier onlyAdmins() {
        require(_admins[msg.sender], "Requires Admin");
        _;
    }

    /**
     * add new contract admin
     * @param newAdmin new admin
     */
    function setAdmin(address newAdmin) public onlyAdmins {
        _admins[newAdmin] = true;
    }

    /**
     * revoke an admin
     * @param admin admin to revoke
     */
    function revokeAdmin(address admin) public onlyAdmins {
        _admins[admin] = false;
    }

    /**
     * Storage gap
     * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
     */
    uint256[50] private __gap;
}
