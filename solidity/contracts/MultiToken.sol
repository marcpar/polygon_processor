// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import "./AdminUpgradeable.sol";

/**
 * ERC1155 Implementation
 */
contract MultiToken is Initializable, AdminUpgradeable, ERC1155Upgradeable {
    using CountersUpgradeable for CountersUpgradeable.Counter;

    /**
     * tracks the next id for the new unique asset
     * @dev increment for every unique asset created
     */
    CountersUpgradeable.Counter _tokenIDCounter;

    /**
     * mapping of tokenID to tokenURI
     */
    mapping(uint256 => string) _tokenIDtoURIMap;

    /**
     * initializer
     * @param admin initial admin
     */
    function initialize(address admin) public initializer {
        __AdminUpgradeable_init(admin);
        _tokenIDCounter.reset();
    }

    /**
     * returns uri for the token id
     * @param tokenID id of the token
     */
    function uri(uint256 tokenID) public view override returns (string memory) {
        return _tokenIDtoURIMap[tokenID];
    }

    /**
     * mint an nft to the caller
     * @param tokenURI uri of the token
     */
    function externalMintNFT(string calldata tokenURI) external onlyAdmins {
        _internalMintNFT(tokenURI, _msgSender());
    }

    /**
     * mint an nft to the address
     * @param tokenURI uri of the token
     * @param receiver address that will receive the token
     */
    function externalMintNFTTo(
        string calldata tokenURI,
        address receiver
    ) external onlyAdmins {
        _internalMintNFT(tokenURI, receiver);
    }

    /**
     * Transfer nft from a user to another
     * only the contract admin can call this
     * @param from owner of the token
     * @param receiver new owner of the token
     * @param tokenID id of the token
     * @param amount amount to be transfered
     */
    function externalTransferNFTTo(
        address from,
        address receiver,
        uint256 tokenID,
        uint256 amount
    ) external onlyAdmins {
        _safeTransferFrom(from, receiver, tokenID, amount, "");
    }

    /**
     * mint an nft to address
     * @param tokenURI uri of the token
     * @param receiver address that will receive the token
     */
    function _internalMintNFT(
        string calldata tokenURI,
        address receiver
    ) internal {
        uint256 currentID = _tokenIDCounter.current();
        _mint(receiver, currentID, 1, "");
        _tokenIDtoURIMap[currentID] = tokenURI;
        _tokenIDCounter.increment();
    }
}
