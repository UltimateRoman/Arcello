import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import './App.css';

class Assets extends Component {

    render() {
        return(
            <div className="container-fluid mt-5">
                <div className="row">
                    <h1>Your NFT Assets</h1>
                    <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
                    { this.props.assets.map((asset, key) => {
                        return(
                            <Card></Card>
                        )
                    })}
                    </main>
                </div>
            </div>
        );
    }
}

export default Assets;