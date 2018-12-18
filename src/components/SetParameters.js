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
      this.props.handleChangeM(event.target.value);
  }

  handleChangeN(event) {
    this.props.handleChangeN(event.target.value);
  }

  handleChangeLamda(event){
    this.props.handleChangeLamda(event.target.value);
  }

  handleChangeMu(event){
    this.props.handleChangeMu(event.target.value);
  }

  renderInputN(disabled = true) {
    return <input
      type="number"
      value={this.props.n}
      className="form-control"
      min="0"
      max="10"
      onChange={this.handleChangeN}
      disabled={disabled}
    />;
  }

  renderInputM(disabled = true) {
    return <input
      type="number"
      value={this.props.m}
      className="form-control"
      min="0"
      max="10"
      onChange={this.handleChangeM}
      disabled={disabled}
    />;
  }

  render() {
    return (
      <div className="row">
        <div className="col-6">
          <div className="form-group row">
            <label htmlFor="inputEmail3" className="col-6 col-form-label">Число каналів n = </label>
            <div className="col-2">
              {this.props.isMulti ? this.renderInputN(false) : this.renderInputN()}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputEmail3" className="col-6 col-form-label">Число елементів в черзі m = </label>
            <div className="col-2">
            {this.props.isChain ? this.renderInputM(false) : this.renderInputM()}
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="form-group row">
            <label htmlFor="inputEmail3" className="col-6 col-form-label">Інтенсивність поступу вимог λ = </label>
            <div className="col-2">
              <input
                type="number"
                value={this.props.lamda}
                className="form-control"
                min="0"
                max="1000"
                onChange={this.handleChangeLamda}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputEmail3" className="col-6 col-form-label">Інтенсивність обсл. 1 каналом μ = </label>
            <div className="col-2">
              <input
                type="number"
                value={this.props.mu}
                className="form-control"
                min="0"
                max="1000"
                onChange={this.handleChangeMu}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SetParameters.defaultProps = {
    isMulti: true,
    isChain: true
};
