import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import './App.css';

class Bids extends Component {

    render() {
        return (
            <div className="container-fluid mt-5" style={{ textAlign: 'center' }}>
                <div className="row">
                    <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ margin: '0% 15%' }}>
                        <h1>View Bids for your Assets</h1>
                        {this.props.bids.map((bid, key) => {
                            return (
                                <Card>
                                    <Card.Header>Bid for NFT {bid.tid.toString()}</Card.Header>
                                    <Card.Body>
                                        <Card.Title>Offered Bid Amount: {window.web3.utils.fromWei(bid.amount.toString(), 'Ether')} CELO</Card.Title>
                                        <Card.Text>
                                            Bidder: {bid.bidder}
                                        </Card.Text>
                                        <Button
                                            variant="primary"
                                            name={bid.id}
                                            onClick={(event) => {
                                                this.props.approveBid(event.target.name)
                                            }}
                                        >
                                            Approve Bid
                                    </Button>
                                    </Card.Body>
                                </Card>
                            )
                        })}
                    </main>
                </div>
            </div>
        );
    }
}

export default Bids;