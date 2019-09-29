import React, { Component } from 'react'
import ChangeCount from './ChangeCount'

class DynamicTable extends Component {

  constructor() {
      super() //since we are extending class Table so we have to use super in order to override Component class constructor
      this.state = { //state is by default an object
         rowCount: 6,
         colCount: 6,
         arrayM: [
           [1, 5, 10, 7, 8, 8],
           [2, 6, 9, 7, 8, 8],
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
        header.push(<th key={i}>Альтернатива {temp}</th>)
      }
      header.unshift(<th key={101}>Експерти/Альтернатива</th>)
      return header;
   }


   handleArrayColChange = (indexCol, indexRow) => evt => {
    let tempArray = this.state.arrayM;
    tempArray[indexRow][indexCol] = parseInt(evt.target.value);


    this.setState({ arrayM: tempArray });
  };

   renderTable() {
     const temp = this.state.arrayM
     temp.forEach((row, index) => {
       row.unshift(0);
     })
     return temp.map((row, index) => {
       return row.map((col, indexCol) => {
        if(indexCol > 0) {
           return <td key={indexCol}><input
                type="number"
                value={col}
                className="form-control"
                min="0"
                max="10"
                onChange={this.handleArrayColChange(indexCol, index)}
              /></td>
         }
         else {
           return <td key={index}>Експерт {++index}</td>
         }
       })
     }).map((row,index) => {
       return <tr key={index}>{row}</tr>
     });
   }


   compute(){
     const tempArray = this.state.arrayM;
     const expertsCount = this.state.rowCount;
     let result = [];
     let sumRows = [];
     let temp = 0;

     console.log(tempArray);
     sumRows = tempArray.map((row, index) => {
         return row.reduce((sum, current) => {
           return sum + current;
         }, 0)
     });

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
       return {name: index, value: data}
     }).sort((a, b) => (a.value > b.value) ? 1 : -1).reverse().map((data, index) => {
       return <h4>X{data.name}: {data.value}</h4>
     });

   }



   render() { //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
     //console.log(this.state.arrayM);
     //console.log(this.compute());

     return (
       <div>
               <h1 id='title'>Практична робота 1</h1>
               <div className="row">
                 <ChangeCount handleChangeCount ={this.handleChangeRowCount.bind(this)}
                                 count = {this.state.rowCount}
                                 title = "Число експертів = "/>
                 <ChangeCount handleChangeCount ={this.handleChangeColCount.bind(this)}
                                 count = {this.state.colCount}
                                 title = "Число альтернатив = "/>
               </div>
               <table id='students'>
                  <thead>
                    {this.renderTableHeader()}
                  </thead>
                  <tbody>
                      {this.renderTable()}
                  </tbody>
               </table>
               <h1>Результати:</h1>
               <>
                {this.renderResult()}
               </>

      </div>
     );
   }
}

export default DynamicTable
