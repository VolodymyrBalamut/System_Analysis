import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Stage } from 'react-konva';
import Rectangle from "./Rectangle"

export default class Diagram extends Component {
  render() {
    const { m , n, lamda, mu, indexesMu, indexesLamda, isArrowEnd } = this.props;
    const count = parseInt(m) + parseInt(n);
    const startX = 50;
    const array = [];
    let temp, indexMu, indexLamda;
    console.log(indexesLamda);
    for (let i = 0; i <= count; i++) {
      if(i === count && !isArrowEnd) {
        temp = <Rectangle key = { i }
                          width = { 50 }
                          x = { startX + i * 100 }
                          text = { "P" + i }
                          isArrow = { false }/>;
      }
      else {
        indexMu = i + 1;
        indexLamda = i;
        temp = <Rectangle key = { i }
                          width = { 50 }
                          x = { startX + i * 100 }
                          text = { "P" + i }
                          lamdaText = { lamda ? (lamda * indexesLamda[indexLamda]) : "λ" }
                          muText = { mu ? (mu * this.props.indexesMu[indexMu]) : (indexMu+"μ") } />;
      }
      array.push(temp);
    }
    return (
      <Stage width={window.innerWidth} height={200}>
        {array}
      </Stage>
    );
  }
}

Diagram.defaultProps = {
    count: 5,
    indexesMu: [0,1,2,2,2,2,2],
    indexesLamda: [1,1,1,1,1,1],
    isArrowEnd:false
};

Diagram.propTypes = {
  count: PropTypes.number,
  indexesMu: PropTypes.array,
  indexesLamda: PropTypes.array,
};
