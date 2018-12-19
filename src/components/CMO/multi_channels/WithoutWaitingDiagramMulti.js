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
      requests : [],
      indexesMu: [],
      indexesLamda: []
    };
    this.handleChangeM = this.handleChangeM.bind(this);
    this.handleChangeN = this.handleChangeN.bind(this);
    this.handleChangeLamda = this.handleChangeLamda.bind(this);
    this.handleChangeMu = this.handleChangeMu.bind(this);
    this.getRandomRequest = this.getRandomRequest.bind(this);
    this.getAvgBusyChannels = this.getAvgBusyChannels.bind(this);
    this.updateIndexesMu = this.updateIndexesMu.bind(this);
    this.updateIndexesLamda = this.updateIndexesLamda.bind(this);
    this.updateIndexes = this.updateIndexes.bind(this);
  }

  updateIndexes() {
    this.updateIndexesMu();
    this.updateIndexesLamda();
  }

  updateIndexesMu() {
    let temp = [];
    let count = this.state.n + this.state.m;
    for (var i = 0; i <= count + 1; i++) {
       temp.push(i);
    }
    this.setState({ indexesMu: temp });
  }

  updateIndexesLamda() {
    let temp = [];
    let count = this.state.n + this.state.m;
    for (var i = 0; i <= count + 2; i++) {
       temp.push(1);
    }
    this.setState({ indexesLamda: temp });
  }

  handleChangeM(value) {
    this.setState({m: parseInt(value) },
        () => this.updateIndexes())
  }

  handleChangeN(value) {
   this.setState({n: parseInt(value) },
       () => this.updateIndexes())
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
    for (let i = 1; i <= this.state.n; i++) {
      total += i * this.resolvePn(this.state.lamda, this.state.mu, this.state.n, i);
    }
    return total.toFixed(3);
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
    this.updateIndexes()
  }

  componentWillUnmount() {
   clearInterval(this.timerID);
  }

  render() {
    const { m , n, lamda, mu, indexesMu, indexesLamda} = this.state;
    let array = [];

    for (let i = 0; i <= n; i++) {
      array.push(
        <p key = {i}>
          P<sub>{i}</sub> = {(this.resolvePn(lamda, mu, n, i)).toFixed(3)}
        </p>
      );
    }

    let busyPossible = this.resolvePn(lamda, mu, n, n).toFixed(3);
    let q = (1 - busyPossible).toFixed(3);
    let a = (lamda * q).toFixed(3);
    let busyChannelsAvg = this.getAvgBusyChannels();
    let serveTime = (1/mu).toFixed(3);
    return (
      <div className="container">
        <h2>{"Багатоканальна розімкнута СМО з відмовою"}</h2>
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
                mu = {mu}
                indexesMu = {indexesMu}
                indexesLamda = {indexesLamda}/>

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
            {array}
          </div>
          <div className="col-6">
            <p>Середня кількість зайнятих каналів: N<sub>зк</sub> = {busyChannelsAvg} канала</p>
            <p>Середня кількість каналів, що простоюють: N<sub>пр</sub> = {(n - busyChannelsAvg).toFixed(3)} канала</p>
            <p>Коефіцієнт зайнятості каналів обслуговуванням: K<sub>з</sub> = {(busyChannelsAvg / n).toFixed(3)} </p>
            <p>Імовірність відмови P<sub>відм</sub> = {busyPossible}</p>
            <p>Відносна пропускна здатність: Q =  {q}</p>
            <p>Абсолютна пропускна здатність: A = {a} заявок/хв.</p>
            <p>Час обслуговування: t<sub>об</sub> = {serveTime} хв.</p>
            <p>Середній час простою СМО: t<sub>пр</sub> = {(serveTime*busyPossible).toFixed(3)} хв.</p>
            <p>Середній час простою канала: t<sub>п.к.</sub> = {(serveTime*(1-busyPossible)/busyPossible).toFixed(3)} хв.</p>
            <p>Середній час перебування заявки в СМО: T<sub>смо</sub> = {(q/mu).toFixed(3)} хв.</p>
          </div>
        </div>

        <h4>Заявки:</h4>{this.state.requests.map((elem, i) => <div key = {i}>{elem}</div>)}
      </div>
    );
  }
}

export default WithoutWaitingDiagramMulti;
