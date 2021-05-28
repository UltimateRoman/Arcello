import React, { Component } from 'react';
import Web3 from 'web3';
import Arcello from '../abis/Arcello.json';
import { ReactNavbar } from "react-responsive-animate-navbar";
import { SemipolarSpinner } from 'react-epic-spinners';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
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
    if(networkData) {
      const arcello = new web3.eth.Contract(Arcello.abi, networkData.address)
      this.setState({ arcello })
      this.setState({ loading: false })
    } else {
      window.alert('Contract could not be deployed.')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      arcello: null,
      loading: true
    }
  }

  render() {
    return (
      <div style={{height:800}}>
        <Router>
          <ReactNavbar
          color="rgb(240,248,255)"
          logo={logo1}
          menu={[
            { name: "HOME", to: "/" }
          ]}
          social={[]}
          />
          <Route exact path="/"/>
        </Router>
      </div>
    );
  }
}

export default App;
