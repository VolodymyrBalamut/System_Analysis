import React, { Component } from 'react';

export default class ChangeCount extends Component {
  constructor () {
    super();
    this.handleChangeCount = this.handleChangeCount.bind(this);
  }
  handleChangeCount(event) {
      this.props.handleChangeCount(event.target.value);
  }

  renderInputCount() {
    return <input
      type="number"
      value={this.props.count}
      className="form-control"
      min="0"
      max="10"
      onChange={this.handleChangeCount}
    />;
  }

  render() {
    return (
        <div className="col-6">
          <div className="form-group row">
            <label htmlFor="inputEmail3" className="col-6 col-form-label">{this.props.title}</label>
            <div className="col-2">
              {this.renderInputCount()}
            </div>
          </div>
        </div>
    );
  }
}
