import React, { Component } from 'react';
import Diagram from "../../../components/Diagram";
import SetParameters from "../../../components/SetParameters";
import ProbabilityEquation from "../../../components/ProbabilityEquation";

class WithWaitingClosedDiagramMulti extends Component {
  constructor () {
    super()
    this.state = {
      m:4,
      n:2,
      lamda:15,
      mu:3,
      indexesMu: [],
      indexesLamda: []
    };
    this.handleChangeM = this.handleChangeM.bind(this);
    this.handleChangeN = this.handleChangeN.bind(this);
    this.handleChangeLamda = this.handleChangeLamda.bind(this);
    this.handleChangeMu = this.handleChangeMu.bind(this);
    this.updateIndexesMu = this.updateIndexesMu.bind(this);
    this.updateIndexesLamda = this.updateIndexesLamda.bind(this);
    this.updateIndexes = this.updateIndexes.bind(this);
  }

  handleChangeM(numb) {
    this.setState({m: parseInt(numb) },
        () => this.updateIndexes())
  }

  handleChangeN(numb) {
   this.setState({n: parseInt(numb)},
       () => this.updateIndexes())
  }

  handleChangeLamda(value) {
    this.setState({ lamda: value });
  }

  handleChangeMu(value) {
    this.setState({ mu: value });
  }

  updateIndexesMu() {
    let temp = [];
    let tempN = parseInt(this.state.n);
    let tempM = parseInt(this.state.m);
    let count = tempN + tempM;
    for (var i = 0; i <= count + 1; i++) {
      if(i <= tempN) temp.push(i);
      else temp.push(tempN);
    }
    this.setState({ indexesMu: temp });
  }

  updateIndexesLamda() {
    let temp = [];
    let count = this.state.n + this.state.m;
    while(count != 0){
      temp.push(count);
      count--;
    }
    this.setState({ indexesLamda: temp });
  }

  updateIndexes() {
    this.updateIndexesMu();
    this.updateIndexesLamda();
  }

  componentDidMount() {
    this.updateIndexes();
  }

  render() {
    const { m , n, lamda, mu, indexesMu, indexesLamda } = this.state

    console.log(indexesMu);
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
                         mu = {mu}
                          />

        <Diagram  m={m}
                  n={n}
                  lamda = {lamda}
                  mu = {mu}
                  indexesMu = {indexesMu} indexesLamda = {indexesLamda}/>

                  <div className="row">
                    <div className="col-4">
                      <ProbabilityEquation m={m}
                                           n={n}
                                           lamda={lamda}
                                           mu = {mu}
                                           indexesMu = {indexesMu}
                                           indexesLamda = {indexesLamda}/>
                    </div>
                    <div className="col-2">

                    </div>
                    <div className="col-6">

                    </div>
                  </div>
      </div>
    );
  }
}

export default WithWaitingClosedDiagramMulti;
