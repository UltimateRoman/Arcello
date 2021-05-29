import React, { Component } from 'react';
import Web3 from 'web3';
import Arcello from '../abis/Arcello.json';
import { ReactNavbar } from "react-responsive-animate-navbar";
import { SemipolarSpinner } from 'react-epic-spinners';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Home from './Home';
import Gallery from './Gallery';
import Create from './Create';
import logo1 from '../logo.png';

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.celo) {
      await window.celo.enable()
      window.web3 = new Web3(window.celo)
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Use the Celo Extension Wallet!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Arcello.networks[networkId]
    if (networkData) {
      const arcello = new web3.eth.Contract(Arcello.abi, networkData.address)
      this.setState({ arcello })
      const tokenid = await arcello.methods.tokenid.call()
      for (let i = 1; i <= tokenid; i++) {
        const asset = await arcello.methods.assets(i).call()
        if (asset.owner == this.state.account) {
          this.setState({
            myassets: [...this.state.myassets, asset]
          })
        }
        else if (asset.sold == false) {
          this.setState({
            assets: [...this.state.assets, asset]
          })
        }
      }
      const bidCount = await arcello.methods.bidCount.call()
      for (let i = 1; i <= bidCount; i++) {
        const bid = await arcello.methods.bids(i).call()
        if (bid.creator === this.state.account) {
          this.setState({
            bids: [...this.state.bids, bid]
          })
        }
      }
      this.setState({ loading: false })
    } else {
      window.alert('Contract could not be deployed.')
    }
  }

  createAsset(price, name, fileid) {
    this.setState({ loading: true })
    this.state.arcello.methods.createAsset(window.web3.utils.toWei(price.toString(), 'ether'), name, fileid).send({ from: this.state.account })
      .once('confirmation', (n, receipt) => {
        this.setState({ loading: false })
        window.location.reload()
      })
  }

  createBid(tid, amount) {
    this.setState({ loading: true })
    this.state.arcello.methods.createBid(tid, window.web3.utils.toWei(amount.toString(), 'ether')).send({ from: this.state.account })
    .once('confirmation', (n, receipt) => {
      this.setState({ loading: false })
      window.location.reload()
    })
  }

  approveBid(id) {
    this.setState({ loading: true })
    this.state.arcello.methods.approveBid(id).send({ from: this.state.account })
    .once('confirmation', (n, receipt) => {
      this.setState({ loading: false })
      window.location.reload()
    })
  }

  purchaseAsset(id) {
    this.setState({ loading: true })
    this.state.arcello.methods.purchaseAsset(id).send({ from: this.state.account })
    .once('confirmation', (n, receipt) => {
      this.setState({ loading: false })
      window.location.reload()
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      arcello: null,
      assets: [],
      myassets: [],
      bids: [],
      loading: true
    }

    this.createAsset = this.createAsset.bind(this)
    this.createBid = this.createBid.bind(this)
    this.approveBid = this.approveBid.bind(this)
    this.purchaseAsset = this.purchaseAsset.bind(this)
  }

  render() {
    return (
      <div style={{ height: 800 }}>
        <ReactNavbar
            color="rgb(0,0,0)"
            logo={logo1}
            menu={[
              { name: "HOME", to: "/"},
              { name: "GALLERY", to: "/gallery" },
              { name: "CREATE", to: "/create"},
              { name: "YOUR ASSETS", to: "/myassets" },
              { name: "BIDS", to: "/bids" },
            ]}
            social={[]}
          />
        <Router>
        <Switch>          
          <Route exact path="/" render={props => (
            <React.Fragment>
              {
                this.state.loading
                  ? <div class="center"><SemipolarSpinner size="100" color="blue" /></div>
                  : <Home />
              }
            </React.Fragment>
          )} />
          <Route exact path="/gallery" render={props => (
            <React.Fragment>
              {
                this.state.loading
                  ? <div class="center"><SemipolarSpinner size="100" color="blue" /></div>
                  : <Gallery 
                      assets = {this.state.assets}
                      createBid = {this.createBid}
                      purchaseAsset = {this.purchaseAsset}
                    />
              }
            </React.Fragment>
          )} />
          <Route exact path="/create" render={props => (
            <React.Fragment>
              {
                this.state.loading
                  ? <div class="center"><SemipolarSpinner size="100" color="blue" /></div>
                  : <Create createAsset={this.createAsset} />
              }
            </React.Fragment>
          )} />
        </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
