import React, { Component } from 'react'

class ProbabilityEquation extends Component {


  render () {
    const { lamda, mu, n } = this.props;
    let array = [];
    array.push(
      <p key = {0}>
        P<sub>{0}</sub> : {-lamda}P <sub>{0}</sub> (t) + {mu}P <sub>{1}</sub> {"(t)"} = 0
      </p>
    );

    for (let i = 1; i < n; i++) {
      array.push(
        <p key = {i}>
          P<sub>{i}</sub>: {lamda}P<sub>{i-1}</sub>(t) - {lamda + i * mu}P<sub>{i}</sub>(t) + {(i+1)*mu}P<sub>{i+1}</sub>(t) = 0
        </p>
      );
    }

    array.push(
      <p key = {n}>
        P<sub>{n}</sub> : {lamda}P<sub>{n-1}</sub>{"(t) - "}{n*mu}P<sub>{n}</sub>{"(t)"} = 0
      </p>
    );
    return (
      <div>
        {array}
      </div>
    )
  }
}

export default ProbabilityEquation

ProbabilityEquation.defaultProps = {
    lamda:15,
    mu:3,
    m:0,
    n:5
}
