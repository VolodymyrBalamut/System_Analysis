import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import WithWaitingDiagram from "./components/CMO/one_channel/WithWaitingDiagram";
import WithoutWaitingDiagram from "./components/CMO/one_channel/WithoutWaitingDiagram";

import WithWaitingDiagramMulti from "./components/CMO/multi_channels/WithWaitingDiagramMulti";
import WithWaitingClosedDiagramMulti from "./components/CMO/multi_channels/WithWaitingClosedDiagramMulti";
import WithoutWaitingDiagramMulti from "./components/CMO/multi_channels/WithoutWaitingDiagramMulti";

import DynamicTable from "./components/MEO/DynamicTable";
import DynamicTable2 from "./components/MEO/DynamicTable2";
import Lab2 from "./components/MEO/Lab2";
import Lab3 from "./components/MEO/Lab3";

import HomePage from "./components/HomePage";
import Header from "./components/Header";

class App extends Component {

  render() {
    return (
      <div className="App">
        <BrowserRouter basename={'/test'}>
          <div>
           <Header />
            <Switch>
              <Route exact path={`${process.env.PUBLIC_URL}/`} component={HomePage} />
              <Route path={`${process.env.PUBLIC_URL}/withoutWaitingDiagramOne`} component={WithoutWaitingDiagram} />
              <Route path={`${process.env.PUBLIC_URL}/withWaitingDiagramOne`} component={WithWaitingDiagram} />
              <Route path={`${process.env.PUBLIC_URL}/withoutWaitingDiagramMulti`} component={WithoutWaitingDiagramMulti} />
              <Route path={`${process.env.PUBLIC_URL}/withWaitingDiagramMulti`} component={WithWaitingDiagramMulti} />
              <Route path={`${process.env.PUBLIC_URL}/withWaitingClosedDiagramMulti`} component={WithWaitingClosedDiagramMulti} />
              <Route path={`${process.env.PUBLIC_URL}/MEO`} component={DynamicTable} />
              <Route path={`${process.env.PUBLIC_URL}/Lab2`} component={Lab2} />
              <Route path={`${process.env.PUBLIC_URL}/Lab3`} component={Lab3} />
              <Route path={`${process.env.PUBLIC_URL}/MEO2`} component={DynamicTable2} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
