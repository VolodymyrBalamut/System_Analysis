import React, { Component } from 'react';
import Diagram from "../../../components/Diagram";
import SetParameters from "../../../components/SetParameters";

class WithWaitingDiagramMulti extends Component {
  constructor () {
    super()
    this.state = {
      m:4,
      n:2
    };
    this.handleChangeM = this.handleChangeM.bind(this);
    this.handleChangeN = this.handleChangeN.bind(this);
    this.handleChangeLamda = this.handleChangeLamda.bind(this);
    this.handleChangeMu = this.handleChangeMu.bind(this);
  }

  handleChangeM(numb) {
    this.setState({m: numb });
  }

  handleChangeN(numb) {
   this.setState({n: numb });
  }

  handleChangeLamda(value) {
    this.setState({ lamda: value });
  }

  handleChangeMu(value) {
    this.setState({ mu: value });
  }

  render() {
    const { m , n, lamda, mu } = this.state
    return (
      <div className="container">
        <h2>{"Багатоканальна замкнена СМО з очікуванням"}</h2>
          <SetParameters handleChangeM ={this.handleChangeM.bind(this)}
                         handleChangeN ={this.handleChangeN.bind(this)}
                         handleChangeLamda={this.handleChangeLamda.bind(this)}
                         handleChangeMu={this.handleChangeMu.bind(this)}
                         m = {m}
                         n = {n}  
                         lamda = {lamda}
                         mu = {mu} />

        <Diagram  m={m}
                  n={n}
                  lamda = {lamda}
                  mu = {mu}/>
      </div>
    );
  }
}

export default WithWaitingDiagramMulti;
