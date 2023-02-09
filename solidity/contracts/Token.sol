// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

/**
 * ERC1155 Implementation
 */
contract Token is Initializable, ContextUpgradeable, ERC1155Upgradeable {
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
     * addresses allowed to mint/burn an asset
     */
    mapping(address => bool) _allowedMinters;
    
    /**
     * require allowed minter
     */
    modifier onlyAllowedMinters() {
        require(
            _allowedMinters[_msgSender()],
            "Not allowed to mint"
        );
        _;
    }
    
    /**
     * initializer
     * @param allowedMinter initial allowed minter
     */
    function initialize(address allowedMinter) public initializer {
        _allowedMinters[allowedMinter] = true;
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
     * check whether the address is allowed to mint or burn
     * @param _address address to check
     */
    function isAllowedToMint(address _address) public view returns (bool) {
        return _allowedMinters[_address];
    }

    /**
     * allow an address to mint/burn token
     * @param addressToAllow address to allow
     */
    function externalAllowMinter(address addressToAllow) external onlyAllowedMinters {
        _allowedMinters[addressToAllow] = true;
    }

    /**
     * deny an address to mint/burn token
     * @param addressToDeny address to deny
     */
    function externalDenyMinter(address addressToDeny) external onlyAllowedMinters {
        _allowedMinters[addressToDeny] = false;
    }

    /**
     * mint an nft to the caller
     * @param tokenURI uri of the token
     */
    function externalMintNFT(string calldata tokenURI) external onlyAllowedMinters {
        _internalMintNFT(tokenURI, _msgSender());
    }

    /**
     * mint an nft to the address
     * @param tokenURI uri of the token
     * @param receiver address that will receive the token
     */
    function externalMintNFTTo(string calldata tokenURI, address receiver) external onlyAllowedMinters {
        _internalMintNFT(tokenURI, receiver);
    }

    /**
     * mint an nft to address
     * @param tokenURI uri of the token
     * @param receiver address that will receive the token
     */
    function _internalMintNFT(string calldata tokenURI, address receiver) internal {
        uint256 currentID = _tokenIDCounter.current();
        _mint(receiver, currentID, 1, "");
        _tokenIDtoURIMap[currentID] = tokenURI;
        _tokenIDCounter.increment();
    }

}