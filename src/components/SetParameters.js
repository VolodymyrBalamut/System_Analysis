import React, { Component } from 'react';


export default class SetParameters extends Component {
  constructor () {
    super();
    this.handleChangeM = this.handleChangeM.bind(this);
    this.handleChangeN = this.handleChangeN.bind(this);
    this.handleChangeLamda = this.handleChangeLamda.bind(this);
    this.handleChangeMu = this.handleChangeMu.bind(this);
  }
  handleChangeM(event) {
      this.props.handleChangeM(parseInt(event.target.value));
  }

  handleChangeN(event) {
    this.props.handleChangeN(parseInt(event.target.value));
  }

  handleChangeLamda(event){
    this.props.handleChangeLamda(parseInt(event.target.value));
  }

  handleChangeMu(event){
    this.props.handleChangeMu(parseInt(event.target.value));
  }

  render() {
    let inputN, inputM;
    if(!this.props.isMulti) {
        inputN = <input type="number" value={this.props.n}className="form-control"
         min="0" max="10" onChange={this.handleChangeN} disabled/>;
    }
    else {
      inputN = <input type="number" value={this.props.n}className="form-control"
       min="0" max="10" onChange={this.handleChangeN}/>;
    }

    if(!this.props.isChain) {
        inputM = <input type="number" value={this.props.m} className="form-control"
         min="0" max="10" onChange={this.handleChangeM} disabled/>;
    }
    else {
      inputM = <input type="number" value={this.props.m} className="form-control"
       min="0" max="10" onChange={this.handleChangeM} />;
    }

    return (
      <div className="row">
        <div className="col-6">
          <div className="form-group row">
            <label for="inputEmail3" className="col-6 col-form-label">Число каналів n = </label>
            <div className="col-2">
            {inputN}
            </div>
          </div>

          <div className="form-group row">
            <label for="inputEmail3" className="col-6 col-form-label">Число елементів в черзі m = </label>
            <div className="col-2">
              {inputM}
            </div>
          </div>
          </div>
          <div className="col-6">
          <div className="form-group row">
            <label for="inputEmail3" className="col-6 col-form-label">Інтенсивність поступу вимог λ = </label>
            <div className="col-2">
            <input type="number" value={this.props.lamda} className="form-control"
             min="0" max="1000" onChange={this.handleChangeLamda} />
            </div>
          </div>

          <div className="form-group row">
            <label for="inputEmail3" className="col-6 col-form-label">Інтенсивність обсл. 1 каналом μ = </label>
            <div className="col-2">
            <input type="number" value={this.props.mu} className="form-control"
             min="0" max="1000" onChange={this.handleChangeMu} />
            </div>
          </div>
          </div>
      </div>
    );
  }
}

SetParameters.defaultProps = {
    isMulti: true,
    isChain:true
};
