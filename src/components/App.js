import React, { Component } from 'react';
import { ReactNavbar } from "react-responsive-animate-navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import logo1 from '../logo.png';

class App extends Component {
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
