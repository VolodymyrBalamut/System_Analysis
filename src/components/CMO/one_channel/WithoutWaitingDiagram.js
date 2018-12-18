import React, { Component } from 'react';

import Diagram from "../../../components/Diagram"
import SetParameters from "../../../components/SetParameters";

class WithoutWaitingDiagram extends Component {
  constructor () {
    super()
    this.state = {
      m: 0,
      n: 1,
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
    const {m , n, lamda, mu} = this.state
    return (
      <div className="container">
      <h2>{"Одноканальна замкнена СМО з відмовою"}</h2>
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

        <Diagram m={m} n={n} lamda={lamda} mu={mu}/>
      </div>
    );
  }
}

export default WithoutWaitingDiagram;
