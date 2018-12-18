import React, { Component } from 'react';

import Diagram from "../../../components/Diagram";
import SetParameters from "../../../components/SetParameters";
import ProbabilityEquation from "../../../components/ProbabilityEquation";


class WithoutWaitingDiagramMulti extends Component {
  constructor () {
    super()
    this.state = {
      m:0,
      n:5,
      lamda:15,
      mu:3,
      requests:[]

    };
    this.handleChangeM = this.handleChangeM.bind(this);
    this.handleChangeN = this.handleChangeN.bind(this);
    this.handleChangeLamda = this.handleChangeLamda.bind(this);
    this.handleChangeMu = this.handleChangeMu.bind(this);
    this.getRandomRequest = this.getRandomRequest.bind(this);
    this.getAvgBusyChannels = this.getAvgBusyChannels.bind(this);
  }

  handleChangeM(numb) {
      //let numb = parseInt(event.target.value);
      this.setState({m: numb });
  }

  handleChangeN(numb) {
   this.setState({n: numb });
  }

  handleChangeLamda(numb) {
    this.setState({lamda: numb });
  }

  handleChangeMu(numb) {
    this.setState({mu: numb });
  }

  rFactorial(num)
  {
      if (num === 0)
        { return 1; }
      else
        { return num * this.rFactorial( num - 1 ); }
  }
  resolvePsi(lamda, mu){
    return lamda / mu;
  }

  resolveP0(lamda, mu, n) {
    let Psi = this.resolvePsi(lamda, mu);
    let sum = 0, total;
    for (var i = 0; i <= n; i++) {
      sum += Math.pow(Psi,i) / this.rFactorial(i);
      //console.log(sum);
    }
    if(sum != 0) {
      total = 1 / sum;
    }
    else {
      total = 0;
    }
    return total;
  }

  resolvePn(lamda, mu, n, index){
    let total;
    if(index > 0) {
      total = this.resolveP0(lamda, mu, n) * Math.pow(this.resolvePsi(lamda, mu),index) / this.rFactorial(index);
    }
    else{
      total = this.resolveP0(lamda, mu, n);
    }
    return total;
  }

  getAvgBusyChannels(){
    let total = 0;
    for (var i = 1; i < this.state.n; i++) {
      total += i * this.resolvePn(this.state.lamda, this.state.mu, this.state.n, i);
    }
    return (total).toFixed(1);
  }
  getRandomRequest()
  {
    let temp = this.state.requests;
    let numb = Math.floor(Math.random() * 11);
    let busy = () => {
      if(numb <= this.state.n){
        return numb;
      }
      else {
        return this.state.n;
      }
    }
    let revert = () => {
      if(numb <= this.state.n){
        return 0;
      }
      else {
        return numb - this.state.n;
      }
    }
    temp.push(<p>{new Date().toLocaleTimeString()}: {numb} заявок поступило,
    каналів зайнято - {busy()}, відмов - {revert()}</p>);
    this.setState({
     requests: temp
   });
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.getRandomRequest(),
      5000
    );
  }

  componentWillUnmount() {
   clearInterval(this.timerID);
  }




  render() {
    const {m , n, lamda, mu} = this.state
    let array = [];

    for (var i = 0; i <= n; i++) {
      array.push(<p>P<sub>{i}</sub> = {(this.resolvePn(lamda, mu, n, i)).toFixed(2)}</p>);
    }
    return (
      <div className="container">
        <h2>{"Багатоканальна замкнена СМО з відмовою"}</h2>
          <SetParameters handleChangeM ={this.handleChangeM.bind(this)}
                         handleChangeN ={this.handleChangeN.bind(this)}
                         handleChangeLamda={this.handleChangeLamda.bind(this)}
                         handleChangeMu={this.handleChangeMu.bind(this)}
                         m = {m}
                         n = {n}
                         lamda = {lamda}
                         mu = {mu}
                         isChain = {false}/>

        <Diagram
                m={m}
                n={n}
                lamda = {lamda}
                mu = {mu}/>
        <div className="row">
          <div className="col-4">
            <ProbabilityEquation m={m}
            n={n} lamda={lamda} mu = {mu}/>
          </div>
          <div className="col-4">
            {array}
          </div>
          <div className="col-4">Середня кількість зайнятих каналів: {this.getAvgBusyChannels()}</div>
        </div>

        <h4>Заявки:</h4>
        <p>{this.state.requests}</p>


      </div>
    );
  }
}
export default WithoutWaitingDiagramMulti;
