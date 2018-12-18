import React, { Component } from 'react';

import Diagram from "../../../components/Diagram"
import SetParameters from "../../../components/SetParameters";

class WithoutWaitingDiagram extends Component {
  constructor () {
    super()
    this.state = {
      m:0,
      n:1
    };
    this.handleChangeM = this.handleChangeM.bind(this);
    this.handleChangeN = this.handleChangeN.bind(this);
  }

  handleChangeM(event) {
      let numb = parseInt(event.target.value);
      this.setState({m: numb });
  }

  handleChangeN(event) {
   this.setState({n: parseInt(event.target.value) });
  }

  render() {
    const {m , n} = this.state
    return (
      <div className="container">
      <h2>{"Одноканальна замкнена СМО з відмовою"}</h2>
      <SetParameters handleChangeM ={this.handleChangeM.bind(this)}
                     handleChangeN ={this.handleChangeN.bind(this)}
                     m = {m}
                     n = {n}
                     isChain = {false}
                     isMulti = {false}  />

        <Diagram m={m} n={n} />
      </div>
    );
  }
}

export default WithoutWaitingDiagram;
