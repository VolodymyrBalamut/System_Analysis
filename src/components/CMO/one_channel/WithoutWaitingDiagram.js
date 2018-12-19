import React, { Component } from 'react';

import Diagram from "../../../components/Diagram"
import SetParameters from "../../../components/SetParameters";

class WithoutWaitingDiagram extends Component {
  constructor () {
    super()
    this.state = {
      m: 0,
      n: 1,
      mu: 3,
      lamda: 15
    };
    this.handleChangeM = this.handleChangeM.bind(this);
    this.handleChangeN = this.handleChangeN.bind(this);
    this.handleChangeMu = this.handleChangeMu.bind(this);
    this.handleChangeLamda = this.handleChangeLamda.bind(this);
  }

  handleChangeM(value) {
    this.setState({ m: value });
  }

  handleChangeN(value) {
   this.setState({ n: value });
  }

  handleChangeMu(value) {
    this.setState({ mu: value });
  }

  handleChangeLamda(value) {
   this.setState({ lamda: value });
  }

  render() {
    const {m , n, lamda, mu} = this.state;
    let serveTime = (1/mu).toFixed(3);
    return (
      <div className="container">
      <h2>{"Одноканальна розімкнута СМО з відмовою"}</h2>
      <SetParameters handleChangeM = {this.handleChangeM.bind(this)}
                     handleChangeN = {this.handleChangeN.bind(this)}
                     handleChangeLamda = {this.handleChangeLamda.bind(this)}
                     handleChangeMu = {this.handleChangeMu.bind(this)}
                     m = {m}
                     n = {n}
                     lamda = {lamda}
                     mu = {mu}
                     isChain = {false}
                     isMulti = {false}  />

        <Diagram m={m} n={n} lamda={lamda} mu={mu} minChannels="1"/>

        <div className="row">
          <div className="col-4">
            <p>Час обслуговування: t<sub>об</sub> = {serveTime} хв.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default WithoutWaitingDiagram;
