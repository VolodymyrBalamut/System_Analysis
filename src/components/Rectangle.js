import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layer, Rect, Text, Arrow } from 'react-konva';
import Konva from 'konva';

export default class Rectangle extends Component {
  constructor () {
    super()
    this.state = {
      color: 'white',
      strokeColor: 'black'
    }
  }

  handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor()
    });
  };


  render() {
    const {color, strokeColor} = this.state
    const {x, y, width, height, text, lamdaText, muText} = this.props

    let arrow1, arrow2;
    let lamda, mu;
    if (this.props.isArrow) {
      arrow1 = <Arrow
        points={[x + width, y + 10, x + 2*width - 5, y + 10]}
        pointerLength={10}
        pointerWidth={5}
        fill={'black'}
        stroke= {'black'}
        strokeWidth={2}
       />;

       lamda = <Text
         x={x + width + 20}
         y={y - 10}
         text={lamdaText}
         fontSize={15}
         fontFamily={'Calibri'}
         fill={'black'}
       />;

       arrow2 =  <Arrow
          points={[x + 2*width, y + height - 10, x + width + 5, y + height - 10]}
          pointerLength={10}
          pointerWidth={5}
          fill={'black'}
          stroke= {'black'}
          strokeWidth={2}
         />;

         mu = <Text
           x={x + width + 20}
           y={y + height - 10}
           text={muText}
           fontSize={15}
           fontFamily={'Calibri'}
           fill={'black'}
         />;
       }

    return (
      <Layer>
        <Rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={color}
          shadowBlur={5}
          stroke= {strokeColor}
          onClick={this.handleClick}
        />
        <Text
          x={x + width / 2 - 5}
          y={y + height / 2 - 5}
          text={text}
          fontSize={15}
          fontFamily={'Calibri'}
          fill={'black'}
        />
        {arrow1}
        {lamda}
        {arrow2}
        {mu}
      </Layer>
    );
  }
}

// Set default props
Rectangle.defaultProps = {
    x: 50,
    y: 50,
    width:75,
    height:75,
    text:'S1',
    isArrow:true,
    lamdaText: "λ",
    muText: "μ"
};



Rectangle.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number
};
