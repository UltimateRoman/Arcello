pragma solidity >=0.5.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Arcello is ERC721 {

    constructor() ERC721("Arcello", "ARC") {}

    uint public tokenid;
    uint public bidCount;

    mapping(uint => Asset) public assets;    
    mapping(uint => Bid) public bids;

    struct Asset {
        uint id;
        bool sold;
        uint256 price;
        string name;
        string fileid;
        address payable creator;
        address approvedTo;
        address owner;
    }

    struct Bid {
        uint id;
        uint tid;
        uint256 amount;
        address payable creator;
        address bidder;
    }


  function createAsset(uint256 _price, string memory _name) public {
        require(_price > 0);
        tokenid++;
        _safeMint(msg.sender, tokenid);
        assets[tokenid] = Asset(tokenid, false, _price, _name, msg.sender, msg.sender);
    }
}