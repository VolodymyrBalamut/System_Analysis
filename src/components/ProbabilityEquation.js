import React, { Component } from 'react'

class ProbabilityEquation extends Component {


  render () {
    const { lamda, mu, n, m, indexesMu, indexesLamda} = this.props;
    let array = [];
    let count = parseInt(m) + parseInt(n);
    array.push(
      <p key = {0}>
        P<sub>{0}</sub> : {(indexesLamda[0])*(-lamda)}P <sub>{0}</sub> (t) + {mu}P <sub>{1}</sub> {"(t)"} = 0
      </p>
    );


    for (let i = 1; i < count; i++) {
      array.push(
        <p key = {i}>
          P<sub>{i}</sub>: {(indexesLamda[i])*(lamda)}P<sub>{i-1}</sub>(t) - {(indexesLamda[i+1])*lamda + indexesMu[i] * mu}P<sub>{i}</sub>(t) + {indexesMu[i+1]*mu}P<sub>{i+1}</sub>(t) = 0
        </p>
      );
    }

    if(m === 0){
      array.push(
        <p key = {n}>
          P<sub>{count}</sub> : {lamda}P<sub>{n-1}</sub>{"(t) - "}{n*mu}P<sub>{n}</sub>{"(t)"} = 0
        </p>
      );
    }
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
