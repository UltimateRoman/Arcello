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


    function createAsset(uint256 _price, string memory _name, string memory _fileid) public {
        require(_price > 0);
        tokenid++;
        _safeMint(msg.sender, tokenid);
        _setTokenURI(tokenid, _fileid);
        assets[tokenid] = Asset(tokenid, false, _price, _name, _fileid, msg.sender, msg.sender, msg.sender);
    }
    

    function createBid(uint _tid, uint256 _amount) public payable isAsset(_tid) {
        Asset memory asset = assets[_tid];
        uint256 price = asset.price;
        require(_amount > price, "Bid amount less than base price");
        bidCount++;    
        bids[bidCount] = Bid(bidCount, _tid, _amount, asset.creator,  msg.sender);
    }
}