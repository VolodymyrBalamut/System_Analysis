import React, { Component } from 'react'
import ChangeCount from './ChangeCount'

class Lab2 extends Component {

  constructor() {
      super() //since we are extending class Table so we have to use super in order to override Component class constructor
      this.state = { //state is by default an object
         rowCount: 6,
         colCount: 6,
         arrayM: [
           [1, 2, 10, 7, 8, 8],
           [3, 4, 9, 7, 8, 8],
           [1, 5, 10, 7, 8, 8],
           [2, 6, 9, 7, 8, 8],
           [1, 5, 10, 7, 8, 8],
           [2, 6, 9, 7, 8, 8],
         ]
      };

   }

   //count of experts
   handleChangeRowCount(numb) {
     this.setState({rowCount: parseInt(numb) },
         () => this.updateRowCount())
   }



   updateRowCount() {
     let tempRowCount = parseInt(this.state.rowCount);
     let tempArray = this.state.arrayM;

     if(tempRowCount > tempArray.length){
       let tempRow = [];
       for (var i = 0; i < tempArray[0].length; i++)
         tempRow.push(0);
       tempArray.push( tempRow );
     } else if(tempRowCount < tempArray.length) {
       tempArray.pop();
     }

     this.setState({ arrayM: tempArray });
   }

   //count of alternatives
   handleChangeColCount(numb) {
     this.setState({colCount: parseInt(numb) },
         () => this.updateColCount())
   }

   updateColCount() {
     let tempColCount = parseInt(this.state.colCount);
     let tempArray = this.state.arrayM;

     if(tempColCount > tempArray[0].length){
       for (var i = 0; i < tempArray.length; i++) {
         tempArray[i].push(0);
       }
     } else if(tempColCount < tempArray[0].length) {
       for (var i = 0; i < tempArray.length; i++) {
         tempArray[i].pop();
       }
     }

     this.setState({ arrayM: tempArray });
   }



   renderTableHeader() {
      //let header = Object.keys(this.state.students[0])
      let header = [];
      for (var i = 0; i < this.state.colCount; i++) {
        let temp = i + 1;
        header.push(<th key={i}>Стан {temp}</th>)
      }
      return header;
   }


   handleArrayColChange = (indexCol, indexRow) => evt => {
    let tempArray = this.state.arrayM;
    tempArray[indexRow][indexCol] = parseInt(evt.target.value);


    this.setState({ arrayM: tempArray });
  };

   renderTable() {
     let temp = this.state.arrayM
     /*temp.forEach((row, index) => {
       row.unshift(0);
     })*/
     return temp.map((row, index) => {
       return row.map((col, indexCol) => {
        // if(indexCol > 0) {
           return <td key={indexCol}><input
                type="number"
                value={col}
                className="form-control"
                min="0"
                max="10"
                onChange={this.handleArrayColChange(indexCol, index)}
              /></td>
      /*   }
         else {
           return <td key={index}>Експерт {++index}</td>
         }*/
       })
     }).map((row,index) => {
       return <tr key={index}>{row}</tr>
     });
   }

   renderTableWithExperts() {
     let arr = this.renderTable();
     //console.log(arr)
     return arr
     /*return arr.map((row, index) => {
       row.unshift(<td key={index}>Експерт {++index}</td>);
       return row;
     })*/
   }
   gurvitz(){
     const tempArray = this.state.arrayM;
     console.dir(tempArray);
     const expertsCount = this.state.rowCount;
     const a = 0.6;
     let result = [];
     let maxj = [];
     let minj = [];
     // yi = maxi(a*maxj(aij) + (1-a)minj(aij))
     for (var i = 0; i < tempArray.length; i++) {
       let temp = [];
       for (var j = 0; j < tempArray[0].length; j++) {
         temp.push(tempArray[i][j]);
       }
       maxj.push(Math.max.apply(null,temp));
       minj.push(Math.min.apply(null,temp));
       result[i] = Number(a * maxj[i] + (1 - a) * minj[i]).toFixed(2);
     }
     /*console.dir(maxj);
     console.dir(minj);
     console.dir(result);
     console.dir(Math.max.apply(null, result));*/
     return { total: Math.max.apply(null, result), array: result}

   }

   wald() {
    const tempArray = this.state.arrayM;
    let minj = [];

    for(var i = 0; i < tempArray.length; i++)
    {
        let temp = [];
        for(var j = 0; j < tempArray[i].length; j++)
        {
            temp.push(tempArray[i][j]);
        }
        minj.push(Math.min.apply(null, temp));

    }
    return { total:Math.max.apply(null, minj), array:minj};
  }

  minmax() {
    const tempArray = this.state.arrayM;
    let maxj = [];

    for(var i = 0; i < tempArray.length; i++)
    {
        let temp = [];
        for(var j = 0; j < tempArray[i].length; j++)
        {
            temp.push(tempArray[i][j]);
        }
        maxj.push(Math.max.apply(null, temp));

    }
    return {total:Math.min.apply(null, maxj), array: maxj};
}

  laplas(){
    const tempArray = this.state.arrayM;
    let result = [];
    let len = tempArray.length;
    for(var i = 0; i < len; i++)
    {
        let sum = 0;
        for(var j = 0; j < tempArray[i].length; j++)
        {
            //temp.push(tempArray[j][i]);
            sum += tempArray[i][j] / len;
        }
        result.push(Number(sum).toFixed(2));
    }
    return {total:Math.max.apply(null, result), array: result};
  }

  savage(){
    const tempArray = this.state.arrayM;
    let reg = [];
    let result = [];
    let maxj = [];

    for(var i = 0; i < tempArray.length; i++)
    {
        let temp = [];
        for(var j = 0; j < tempArray[i].length; j++)
        {
            temp.push(tempArray[j][i]);
        }

        maxj.push(Math.max.apply(null, temp));

    }

    for(var i = 0; i < tempArray.length; i++)
    {
        let temp = [];
        for(var j = 0; j < tempArray[i].length; j++)
        {
            temp.push(maxj[i] - tempArray[j][i]);
        }
        reg.push(temp);
    }

    for(var i = 0; i < reg.length; i++)
    {
        let temp = [];
        for(var j = 0; j < reg[i].length; j++)
        {
            temp.push(reg[j][i]);
        }
        result.push(Math.max.apply(null, temp));
    }
    return {total:Math.min.apply(null, result), array:result}

}
   compute(){
     const tempArray = this.state.arrayM;
     const expertsCount = this.state.rowCount;
     let result = [];
     let sumRows = [];
     let temp = 0;

     sumRows = tempArray.map((row, index) => {
         return row.reduce((sum, current) => {
           return sum + current;
         }, 0)
     });

     console.dir(sumRows);
     for (var i = 0; i < tempArray[0].length; i++) {
       temp = 0;
       for (var j = 0; j < tempArray.length; j++) {
         temp += tempArray[j][i] / sumRows[j];
       }
       result.push(Number(temp/expertsCount).toFixed(2));
     }

     return result;
   }

   renderResult() {
     let myresult = this.compute();
     return myresult.map((data, index) => {
       return {name: ++index, value: data}
     }).sort((a, b) => (a.value > b.value) ? 1 : -1).reverse().map((data, index) => {
       return <h4>X{data.name}: {data.value}</h4>
     });

   }

   getMaxOfArray(numArray) {
     return Math.max.apply(null, numArray);
   }


   render() { //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
     //console.log(this.state.arrayM);
     //console.log(this.compute());
     console.log(this.gurvitz());
     return (
       <div>
               <h1 id='title'>Практична робота 2</h1>
               <div className="row">
                 <ChangeCount handleChangeCount ={this.handleChangeRowCount.bind(this)}
                                 count = {this.state.rowCount}
                                 title = "Число варіантів рішень = "/>
                 <ChangeCount handleChangeCount ={this.handleChangeColCount.bind(this)}
                                 count = {this.state.colCount}
                                 title = "Число станів = "/>
               </div>
               <table id='students'>
                  <tbody>
                      {this.renderTableHeader()}
                      {this.renderTableWithExperts()}

                  </tbody>
               </table>
               <h1>Результати:</h1>
               <p>
                {" Критерій Гурвіца: " + this.gurvitz().total +
                   " [ " + this.gurvitz().array.map((num, index) => "Стан " + (++index) +" = " + num + "  ") + "]"}
               </p>
               <p>
                {" Критерій Вальда: " + this.wald().total +
                   " [ " + this.wald().array.map((num, index) => "Стан " + (++index) +" = " + num + "  ") + "]"}
               </p>
               <p>
                {" Критерій Minmax: " + this.minmax().total +
                   " [ " + this.minmax().array.map((num, index) => "Стан " + (++index) +" = " + num + "  ") + "]"}
               </p>
               <p>
                {" Критерій Лапласа: " + this.laplas().total +
                   " [ " + this.laplas().array.map((num, index) => "Стан " + (++index) +" = " + num + "  ") + "]"}
               </p>
               <p>
                {" Критерій Севіджа: " + this.savage().total +
                   " [ " + this.savage().array.map((num, index) => "Стан " + (++index) +" = " + num + "  ") + "]"}
               </p>

      </div>
     );
   }
}

export default Lab2
