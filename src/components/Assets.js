import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import './App.css';

class Assets extends Component {

    render() {
        return (
            <div className="container-fluid mt-5">
                <div className="row">
                    <h1>Your NFT Assets</h1>
                    <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
                        {this.props.assets.map((asset, key) => {
                            return (
                                <Card key={key}>
                                    <Card.Body>
                                        <Card.Title>{asset.name}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Creator: {asset.creator}</Card.Subtitle>
                                        <Card.Subtitle className="mb-2 text-muted">NFT ID: {asset.id.toString()}</Card.Subtitle>
                                        <br />
                                        <div className="echoar-embed-wrapper" style={{ width: '100%' }}>
                                            <iframe title={asset.name} style={{ width: '80%', height: '500px', borderRadius: '2%' }} src={"https://console.echoar.xyz/webar?key=" + process.env.REACT_APP_ECHOAR_KEY + "&entry=" + asset.fileid} />
                                        </div>
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

export default Assets;