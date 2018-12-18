import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { Stage, Layer, Rect, Text, Arrow } from 'react-konva';
import Konva from 'konva';

import Rectangle from "./Rectangle"

export default class Diagram extends Component {
  constructor () {
    super()
    this.state = {

    }
  }

  render() {
    const {m , n} = this.props
    let count = m + n;
    let startX = 50;
    let array = [];
    let temp, indexMu;
    for (var i = 0; i <= count; i++) {
      if(i === count) {
        temp = <Rectangle width={50} x={startX + i*100} text={"P" + i} isArrow={false}/>;
      }
      else {
        indexMu = i + 1;
        temp = <Rectangle width={50} x={startX + i*100} text={"P" + i}
                lamdaText = {/*(m-i+1) +*/ "λ"}
                muText = {indexMu+"μ"} />;
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

// Set default props
Diagram.defaultProps = {
    count: 5,
};



Diagram.propTypes = {
  count: PropTypes.number
};
