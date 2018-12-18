import React, { Component } from 'react';

import Diagram from "../../../components/Diagram";
import SetParameters from "../../../components/SetParameters";

class WithWaitingDiagram extends Component {
  constructor () {
    super()
    this.state = {
      m:4,
      n:1
    };
    this.handleChangeM = this.handleChangeM.bind(this);
    this.handleChangeN = this.handleChangeN.bind(this);
  }

  handleChangeM(numb) {
      //let numb = parseInt(event.target.value);
      this.setState({m: numb });
  }

  handleChangeN(numb) {
   this.setState({n: numb });
  }

  render() {
    const {m , n} = this.state
    return (
      <div className="container">
        <h2>{"Одноканальна замкнена СМО з очікуванням"}</h2>
          <SetParameters handleChangeM ={this.handleChangeM.bind(this)}
                         handleChangeN ={this.handleChangeN.bind(this)}
                         m = {m}
                         n = {n}
                         isMulti={false} />

        <Diagram  m={m} n={n}/>
      </div>
    );
  }
}

export default WithWaitingDiagram;
