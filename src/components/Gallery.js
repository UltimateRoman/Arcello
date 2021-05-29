import React, { Component } from 'react';
import './App.css';

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
            <div className="container-fluid mt-5">
                <div className="row">
                    <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
                        {filteredAssets.map((asset, key) => {
                            return (
                                <div class="coupon" key={key} >
                                    <div className="card-header">
                                        <p class="badge badge-primary">{asset.name}</p>
                                        <br />
                                        <div className="sketchfab-embed-wrapper">
                                            <iframe title="SWAT operator" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="fullscreen; autoplay; vr" src={asset.fileid} />
                                        </div>
                                        <br />
                                        <small>Creator: {asset.creator}</small>
                                    </div>
                                    <ul id="postList" className="list-group list-group-flush">
                                        <li key={key} className="list-group-item py-2">
                                            <small className="float-left mt-1 text-muted">
                                                Price: {window.web3.utils.fromWei(asset.price.toString(), 'Ether')} CELO
                                </small>
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
                                                    placeholder="Bid Amount"
                                                    required
                                                />
                                                <button type="submit" className="btn btn-outline-info">Create Bid</button>
                                            </form>
                                        </li>
                                    </ul>
                                </div>
                            )
                        })}
                    </main>
                </div>
            </div>
        );
    }
}

export default Gallery;