import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import WithWaitingDiagram from "./components/CMO/one_channel/WithWaitingDiagram";
import WithoutWaitingDiagram from "./components/CMO/one_channel/WithoutWaitingDiagram";

import WithWaitingDiagramMulti from "./components/CMO/multi_channels/WithWaitingDiagramMulti";
import WithWaitingClosedDiagramMulti from "./components/CMO/multi_channels/WithWaitingClosedDiagramMulti";
import WithoutWaitingDiagramMulti from "./components/CMO/multi_channels/WithoutWaitingDiagramMulti";

import HomePage from "./components/HomePage";
import Header from "./components/Header";

class App extends Component {

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
           <Header />
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route path='/withoutWaitingDiagramOne' component={WithoutWaitingDiagram} />
              <Route path='/withWaitingDiagramOne' component={WithWaitingDiagram} />
              <Route path='/withoutWaitingDiagramMulti' component={WithoutWaitingDiagramMulti} />
              <Route path='/withWaitingDiagramMulti' component={WithWaitingDiagramMulti} />
              <Route path='/withWaitingClosedDiagramMulti' component={WithWaitingClosedDiagramMulti} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
