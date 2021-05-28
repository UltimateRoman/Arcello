pragma solidity >=0.5.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Arcello is ERC721 {

    constructor() ERC721("Arcello", "ARC") {}

    uint public tokenid;

    mapping(uint => Asset) public assets;

    struct Asset {
        uint id;
        bool sold;
        uint256 price;
        string name;
        address payable creator;
        address owner;
    }

  function createAsset(uint256 _price, string memory _name) public {
        require(_price > 0);
        tokenid++;
        _safeMint(msg.sender, tokenid);
        assets[tokenid] = Asset(tokenid, false, _price, _name, msg.sender, msg.sender);
    }
}