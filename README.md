# Arcello
A Decentralized NFT Marketplace and Gallery to showcase, auction and trade 3D Digital Art & Content in the form of crypto-collectibles

![Logo](logo.png?raw=true)

## The Problem

A major problem that digital artists face today is digital piracy. The work is reproducable and adding to that they would also lose a part of their revenue as commissions to 3rd parties. Conventional digital art platforms also lack transparency and their records are vulnerable to tampering. They also have poor or absent ownership verification of the assets.

## How Arcello works

Arcello is essentially a decentralized gallery and marketplace for 3D digital art & content. The Arcello DApp smart contract is deployed on the Celo Alfajores Testnet and the Celo Extension Wallet can be used for transactions. It allows 3D content creators to upload their models on the DApp. It is then hosted using EchoAR and corresponding to each uploaded asset, a Non-Fungible Token or NFT is minted on the Celo Testnet blockchain with the creator as the unique owner. This ownership is also cryptographically verifiable on the blockchain using the token ID. This prevents reproduction of content because it ensures an 'original copy'.
Other platform users can now view the 3D asset NFTs available for sale. The use of echoAR helps provide an in-browser 3D experience. They can now place bids for these assets.

If the creator is pleased with the bid amount offered, they can approve this bid. Subsequently the bidder will be allowed to purchase the NFT. The NFT ownership is now transferred to the approved bidder and the amount is transferred to the creator in CELO currency. This ensures credible payments, avoiding intermediaries and commissions.

Arcello derives all the benefits of Blockchain technology including enhanced transparency, privacy and non-tamperability. Tokenization of the assets ensures unique ownership and content cannot be reproduced, this eliminates piracy and combined with the immmense popularity of NFTs will ensure better revenue for the creators.

## Steps to run Arcello DApp

### Install Dependencies

Node JS - [node](https://nodejs.org/en/download/)

Celo Extension Wallet and set Alfajores Test Network.

### Clone the repo
```
$ git clone https://https://github.com/UltimateRoman/Arcello
$ cd Arcello
```

### Install Truffle and other dependencies
```
$ npm install -g truffle@5.1.44
$ npm install
```

- Create a .secret file in the root directory of the repo and enter your Celo account private key.
- Create a .env file in the root directory and set environment variables:

```
REACT_APP_ECHOAR_KEY = 'Your echoAr API key'
REACT_APP_ECHOAR_EMAIL = 'Your email'
```

### Migrate and Run the DApp
```
$ truffle migrate --reset --network alfajores
$ npm start
```

- Visit localhost:3000 and connect your Celo extension wallet account.
- Enjoy the Arcello experience!


