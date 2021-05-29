import React, { Component } from 'react';
import './App.css';
import mainImg from '../main.png';
import Card from 'react-bootstrap/Card'

class Home extends Component {

    render() {
        return (
            <div className="contain">
                <h1 align="center" style={{ marginTop: '100px' }} class="w3-tangerine">Arcello</h1>
                <h3 align="center"> Team Coding-Fortress </h3>
                <Card className="home-card">
                    <Card.Img variant="top" src={mainImg} />
                    <Card.Body>
                        <Card.Text>
                            Team Coding-Fortress
                            <br />
                            Sponsor Track: Celo Blockchain
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className="home-card">
                    <Card.Body>
                        <Card.Text>
                            <h3>Idea Proposal</h3>
                            <ul>
                                <li>Arcello – a decentralized gallery and marketplace for 3D digital art & content.</li>
                                <li>Essentially a Decentralized Application (DApp) to showcase, auction and trade 3D art in the form of crypto-collectibles.</li>
                            </ul>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className="home-card">
                    <Card.Body>
                        <Card.Text>
                            <h3>How It Works</h3>
                            <ul>
                                <li>Content creators /  Digital Artists can upload 3D Digital Art in the accepted format on the DApp.</li>
                                <li>A Non-Fungible Token (NFT) is minted on the Blockchain corresponding to this 3D asset.</li>
                                <li>Other user can view available assets, create a bid to purchase the asset.</li>
                                <li>If the creator is satisfied with the bid amount, they can approve the bid.</li>
                                <li>Ownership of the NFT is transferred to the purchaser – amount is paid to the creator in crypto-currency.</li>
                            </ul>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className="home-card">
                    <Card.Body>
                        <Card.Text>
                            <h3>Features</h3>
                            <ul>
                                <li>Decentralized – privacy, credible payments</li>
                                <li>Inclusive</li>
                                <li>Tokenized content – Original copy – cannot be reproduced</li>
                                <li>Ownership of the art/content can be cryptographically verified on the Blockchain</li>
                                <li>In-browser 3D experience, using EchoAR</li>
                                <li>Proposed to be deployed on Celo Blockchain</li>
                            </ul>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className="home-card">
                    <Card.Body>
                        <Card.Text>
                            <h3>Problems With Conventional Platforms</h3>
                            <ul>
                                <li>Digital piracy</li>
                                <li>Lack of transparency</li>
                                <li>Commissions</li>
                                <li>Low revenue</li>
                                <li>Poor/Lack of ownership verification</li>
                            </ul>
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className="home-card">
                    <Card.Body>
                        <Card.Text>
                            <h3>Arcello's Advantages</h3>
                            <ul>
                                <li>Arcello is decentralized - transparent credible payments, eliminates commission to 3rd parties.</li>
                                <li>Tamperproof records</li>
                                <li>Guarantees privacy, scalability – Blockchain</li>
                                <li>Popularity of NFTs – better revenue</li>
                                <li>Eliminates piracy – use of NFTs – better revenue</li>
                                <li>Full control & ownership of your assets</li>
                            </ul>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default Home;