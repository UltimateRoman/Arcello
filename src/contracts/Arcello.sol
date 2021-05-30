pragma solidity >=0.5.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Arcello is ERC721 {

  constructor() ERC721("Arcello", "ARC") {}

  modifier isAsset(uint id) {
    require(!assets[id].sold, "Asset sold or does not exist");
    _;
  }

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

  function approveBid(uint _id) public {
    require(_id > 0 && _id <= bidCount);
    Bid memory bid = bids[_id];
    approve(bid.bidder, bid.tid);
    Asset memory asset = assets[bid.tid];
    asset.price = bid.amount;
    asset.approvedTo = bid.bidder;
    assets[bid.tid] = asset;
  }

  function purchaseAsset(uint _id) public payable isAsset(_id) {
    Asset memory asset = assets[_id];
    address payable creator = asset.creator;
    creator.transfer(msg.value);
    safeTransferFrom(creator, msg.sender, _id);
    asset.sold = true;
    asset.owner = msg.sender;
    assets[_id] = asset;
  }
}