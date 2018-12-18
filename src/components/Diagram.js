import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Stage } from 'react-konva';
import Rectangle from "./Rectangle"

export default class Diagram extends Component {
  render() {
    const { m , n, lamda, mu } = this.props;
    const count = parseInt(m) + parseInt(n);
    const startX = 50;
    const array = [];
    let temp, indexMu;
    for (let i = 0; i <= count; i++) {
      if(i === count) {
        temp = <Rectangle key = { i }
                          width = { 50 }
                          x = { startX + i * 100 }
                          text = { "P" + i }
                          isArrow = { false }/>;
      }
      else {
        indexMu = i + 1;
        temp = <Rectangle key = { i }
                          width = { 50 }
                          x = { startX + i * 100 }
                          text = { "P" + i }
                          lamdaText = { lamda ? lamda : "λ" }
                          muText = { mu ? mu * indexMu : indexMu+"μ" } />;
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
};

Diagram.propTypes = {
  count: PropTypes.number
};
