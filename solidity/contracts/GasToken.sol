// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "./AdminUpgradeable.sol";

/**
 * GasToken to be used for biconomy conditional whitelisting
 * see https://docs.biconomy.io/products/enable-gasless-transactions/conditional-whitelisting
 * @title GasToken
 */
contract GasToken is Initializable, AdminUpgradeable, ERC20Upgradeable {
    /**
     * initialize the contract
     * @param name name of the token
     * @param symbol token symbol
     * @param admin initial admin
     */
    function initialize(
        string calldata name,
        string calldata symbol,
        address admin
    ) public initializer {
        __ERC20_init(name, symbol);
        __AdminUpgradeable_init(admin);
    }

    /**
     * Mint token to the target address
     * @param receiver receiver of the token
     * @param amount number of tokens to mint
     */
    function externalMintTo(
        address receiver,
        uint256 amount
    ) external onlyAdmins {
        _mint(receiver, amount);
    }

    /**
     * Burn token from the target address
     * @param owner tokens to burn from
     * @param amount number of tokens to burn
     */
    function externalBurnFrom(
        address owner,
        uint256 amount
    ) external onlyAdmins {
        _burn(owner, amount);
    }
}
