// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./EIP2771ContextUpgradeable.sol";
import "./AdminUpgradeable.sol";
import "./MultiToken.sol";
import "./GasToken.sol";

/**
 * Contract where users will claim their nft
 * @title ClaimToken
 */
contract ClaimToken is
    Initializable,
    AdminUpgradeable,
    EIP2771ContextUpgradeable
{
    /**
     * address of the erc20 gas token
     */
    address _gasToken;

    function initialize(
        address admin,
        address forwarder,
        address gasToken
    ) public initializer {
        __AdminUpgradeable_init(admin);
        __EIP2771ContextUpgradeable_init(forwarder);
        _gasToken = gasToken;
    }

    /**
     * public method required by biconomy relayer to determine which forwarder contract to use
     */
    function trustedForwarder() public view returns (address) {
        return _trustedForwarder;
    }

    /**
     * set the gastoken address
     * @param gasToken address of the gas token contract
     */
    function externalSetGasToken(address gasToken) external onlyAdmins {
        _gasToken = gasToken;
    }

    /**
     * Method to be called by users to claim their nft
     * @param receiver receiver of the nft
     * @param nft address of the nft contract
     * @param tokenId id of the token to claim
     */
    function externalClaimNFT(
        address receiver,
        address nft,
        uint256 tokenId
    ) external {
        address sender = _msgSender();
        MultiToken multiToken = MultiToken(nft);
        require(
            multiToken.balanceOf(sender, tokenId) > 0,
            "Sender does not own the asset"
        );
        multiToken.externalTransferNFTTo(sender, receiver, tokenId, 1);
        GasToken gasToken = GasToken(_gasToken);
        gasToken.externalBurnFrom(sender, 1);
    }
}
