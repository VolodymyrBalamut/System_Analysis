import React, { Component } from 'react';
import Diagram from "../../../components/Diagram";
import SetParameters from "../../../components/SetParameters";
import ProbabilityEquation from "../../../components/ProbabilityEquation";

class WithoutWaitingDiagramMulti extends Component {
  constructor () {
    super()
    this.state = {
      m : 0,
      n : 5,
      lamda : 15,
      mu : 3,
      requests : []
    };
    this.handleChangeM = this.handleChangeM.bind(this);
    this.handleChangeN = this.handleChangeN.bind(this);
    this.handleChangeLamda = this.handleChangeLamda.bind(this);
    this.handleChangeMu = this.handleChangeMu.bind(this);
    this.getRandomRequest = this.getRandomRequest.bind(this);
    this.getAvgBusyChannels = this.getAvgBusyChannels.bind(this);
  }

  handleChangeM(value) {
    this.setState({ m: value });
  }

  handleChangeN(value) {
   this.setState({ n: value });
  }

  handleChangeLamda(value) {
    this.setState({ lamda: value });
  }

  handleChangeMu(value) {
    this.setState({ mu: value });
  }

  rFactorial(num) {
    return num === 0 ? 1 : num * this.rFactorial(num - 1);
  }

  resolvePsi(lamda, mu){
    return lamda / mu;
  }

  resolveP0(lamda, mu, n) {
    let Psi = this.resolvePsi(lamda, mu);
    let sum = 0;
    for (let i = 0; i <= n; i++) {
      sum += Math.pow(Psi,i) / this.rFactorial(i);
    }
    return sum !== 0 ? 1 / sum : 0;
  }

  resolvePn(lamda, mu, n, index){
    return index > 0 ? 
      this.resolveP0(lamda, mu, n) * Math.pow(this.resolvePsi(lamda, mu),index) / this.rFactorial(index) :
      this.resolveP0(lamda, mu, n);
  }

  getAvgBusyChannels(){
    let total = 0;
    for (let i = 1; i < this.state.n; i++) {
      total += i * this.resolvePn(this.state.lamda, this.state.mu, this.state.n, i);
    }
    return total.toFixed(1);
  }

  getRandomRequest(counter) {
    let temp = this.state.requests;
    let numb = Math.floor(Math.random() * 11);

    let busy = () => numb <= this.state.n ? numb : this.state.n;
    let revert = () => numb <= this.state.n ? 0 : numb - this.state.n;

    temp.push(
      <p key = {counter}>
          {new Date().toLocaleTimeString()} :
          заявок поступило - {numb},
          каналів зайнято - {busy()},
          відмов - {revert()}
      </p>
    );
    this.setState({
     requests: temp
   });
  }

  componentDidMount() {
    let counter = 0;
    this.timerID = setInterval(
      () => this.getRandomRequest(counter++),
      5000
    );
  }

  componentWillUnmount() {
   clearInterval(this.timerID);
  }

  render() {
    const { m , n, lamda, mu } = this.state;
    let array = [];

    for (let i = 0; i <= n; i++) {
      array.push(
        <p key = {i}>
          P<sub>{i}</sub> = {(this.resolvePn(lamda, mu, n, i)).toFixed(2)}
        </p>
      );
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
                                 n={n}
                                 lamda={lamda}
                                 mu = {mu}/>
          </div>
          <div className="col-4">
            {array}
          </div>
          <div className="col-4">Середня кількість зайнятих каналів: {this.getAvgBusyChannels()}</div>
        </div>

        <h4>Заявки:</h4>{this.state.requests.map((elem, i) => <div key = {i}>{elem}</div>)}
      </div>
    );
  }
}

export default WithoutWaitingDiagramMulti;
