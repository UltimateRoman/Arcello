import React, { Component } from 'react';
import './App.css';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class Gallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: ''
        };
    }

    updateSearch(event) {
        this.setState({ search: event.target.value.substr(0, 20) });
    }

    render() {

        let filteredAssets = this.props.assets.filter(
            (asset) => {
                return asset.name.indexOf(this.state.search) !== -1;
            }
        );
        return (
            <div className="container-fluid mt-5" style={{ textAlign: 'center' }}>
                <div className="row">
                    <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ margin: '0% 15%' }}>
                        <h1>Search and Purchase Assets</h1>
                        <br />
                        <input placeholder="Type here to search" style={{ width: '80%', margin: 'auto' }} type="text" class="form-control" value={this.state.search} onChange={this.updateSearch.bind(this)} />
                        <p>&nbsp;</p>
                        {filteredAssets.map((asset, key) => {
                            return (
                                <Card key={key}>
                                    <Card.Body>
                                        <Card.Title>{asset.name}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">Creator: {asset.creator}</Card.Subtitle>
                                        <br />
                                        <div className="echoar-embed-wrapper" style={{ width: '100%' }}>
                                            <iframe allowFullScreen title={asset.name} style={{ width: '80%', height: '500px', borderRadius: '2%' }} src={"https://console.echoar.xyz/webar?key=" + process.env.REACT_APP_ECHOAR_KEY + "&entry=" + asset.fileid} />
                                        </div>
                                        <br />
                                        <Card.Subtitle className="mb-2 text-muted">Base Price: {window.web3.utils.fromWei(asset.price.toString(), 'Ether')} CELO</Card.Subtitle>
                                        <Card.Text>
                                            <br />
                                            {/* <small className="float-left mt-1 text-muted">
                                                Price: {window.web3.utils.fromWei(asset.price.toString(), 'Ether')} CELO
                                                    </small> */}
                                            <form onSubmit={(event) => {
                                                event.preventDefault()
                                                const tid = asset.id
                                                const amount = this.bidamount.value
                                                this.props.createBid(tid, amount)

                                            }}>
                                                <input
                                                    id="bidamount"
                                                    type="text"
                                                    ref={(input) => { this.bidamount = input }}
                                                    className="form-control"
                                                    placeholder={`Place a bid higher that ${window.web3.utils.fromWei(asset.price.toString(), 'Ether')} CELO`}
                                                    required
                                                />
                                                <br />
                                                <button type="submit" className="btn btn-outline-info">Create Bid</button>
                                            </form>
                                            <br />
                                            {
                                                asset.approvedTo === this.props.account &&
                                                <Button
                                                    variant="primary"
                                                    name={asset.id}
                                                    onClick={(event) => {
                                                        this.props.purchaseAsset(event.target.name)
                                                    }}
                                                >Purchase</Button>
                                            }
                                        </Card.Text>
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

export default Gallery;