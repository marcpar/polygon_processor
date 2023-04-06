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
     * batch mints nfts to the caller
     *
     * @param tokenURIs uris of the token to mint
     */
    function externalBatchMintNFTs(
        string[] calldata tokenURIs
    ) external onlyAdmins {
        _internalBatchMintNFT(tokenURIs, _msgSender());
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
     * Transfer different nfts from a user to multiple users
     * can only be called by a contract admin
     *
     * @param from current owner
     * @param receivers receivers of the nfts
     * @param tokenIds tokenids to transfer
     * @param amounts amounts to transfer
     */
    function externalBatchTransferNFTTo(
        address from,
        address[] calldata receivers,
        uint256[] calldata tokenIds,
        uint256[] calldata amounts
    ) external onlyAdmins {
        require(
            receivers.length == tokenIds.length &&
                tokenIds.length == amounts.length,
            "receivers, tokenIds, and amounts should be all equal in length"
        );
        for (uint256 counter = 0; counter < receivers.length; counter++) {
            _safeTransferFrom(
                from,
                receivers[counter],
                tokenIds[counter],
                amounts[counter],
                ""
            );
        }
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

    /**
     * batch mint nfts to address
     *
     * @param tokenURIs uris of the tokens
     * @param receiver receiver of the tokens
     */
    function _internalBatchMintNFT(
        string[] calldata tokenURIs,
        address receiver
    ) internal {
        uint256[] memory tokenIds = new uint256[](tokenURIs.length);
        uint256[] memory amounts = new uint256[](tokenURIs.length);

        for (uint256 counter = 0; counter < tokenIds.length; counter++) {
            uint256 _currentId = _tokenIDCounter.current();
            tokenIds[counter] = _currentId;
            _tokenIDtoURIMap[_currentId] = tokenURIs[counter];
            _tokenIDCounter.increment();
            amounts[counter] = 1;
        }

        _mintBatch(receiver, tokenIds, amounts, "");
    }
}
