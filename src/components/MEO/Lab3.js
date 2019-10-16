import React, { Component } from 'react'
import ChangeCount from './ChangeCount'

class Lab3 extends Component {

  constructor() {
      super() //since we are extending class Table so we have to use super in order to override Component class constructor
      this.state = { //state is by default an object
         rowCount: 6,
         colCount: 6,
         arrayM: [
           [1, 2, 3, 4, 1, 3],
           [2, 3, 4, 5, 1, 4],
           [3, 4, 5, 6, 1, 5],
           [4, 5, 6, 1, 2, 6],
           [5, 1, 1, 2, 3, 1],
           [6, 6, 2, 3, 4, 2],
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
   renderTableWithExperts() {
     let arr = this.renderTable();
     //console.log(arr)
     return arr
     /*return arr.map((row, index) => {
       row.unshift(<td key={index}>Експерт {++index}</td>);
       return row;
     })*/
   }
   renderTableResultHeader() {
     let header = [];
     header.push(<th key={i}>\</th>)
     for (var i = 0; i < this.state.colCount; i++) {
       let temp = i + 1;
       header.push(<th key={i}>y {temp}</th>)
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


   renderResult() {
     let rowLabel = [];
     let result = [];
     for (var i = 0; i < this.state.colCount; i++) {
       let temp = i + 1;
       rowLabel.push(<td key={i}>y {temp}</td>)
     }

     let temp = this.state.arrayM;
     for (var i = 0; i < this.state.colCount; i++) {
       let tempArr = [];
       tempArr.push(rowLabel[i]);
       for (var j = 0; j < this.state.colCount; j++) {
         let compare = 0;
         if(i != j) {
           compare = this.rowCompare(temp[j], temp[i]) == 1 ? 1 : '';
         }
         else {
           compare = '';
         }
         tempArr.push(compare);
       }
       result.push(tempArr);
     }

     return result.map((row, index) => {
       return row.map((col, indexCol) => {
        // if(indexCol > 0) {
           return <td key={indexCol}>{col}</td>
       })
     }).map((row,index) => {
       return <tr key={index}>{row}</tr>
     });
   }

   findOptimal() {
     let result = [];
     let temp = this.state.arrayM;
     console.log(temp);
     let str = "{ ";
     for (var i = 0; i < this.state.colCount; i++) {
       let tempArr = [];
       for (var j = 0; j < this.state.colCount; j++) {
         let compare = 0;
         if(i != j){
           compare = this.rowCompare(temp[i], temp[j]) == 1 ? 1 : '';
         }
         else {
           compare = '';
         }

         tempArr.push(compare);
       }
       result.push(tempArr);
     }
     console.dir(result)
     let comma = false;
     for (var i = 0; i < result.length; i++) {
       let flag = false;

       for (var j = 0; j < result[0].length; j++) {
         flag = result[i][j] == 1 ? true : false;
         if(flag) break;
       }
       if(!flag) {
         if(comma) {
           str += ", ";
         }
         comma = true;
         let temp = i + 1;
         str += "y" + temp;
       }
     }

     str += " }"
     return str;
   }
   rowCompare(row1, row2) {
     let plus = 0;
     let minus = 0;
     for (var i = 0; i < this.state.colCount; i++) {
       if(row1[i] >= row2[i]) minus++;
       //else if(row1[i] < row2[i]) plus++;
     }
     if(minus == this.state.colCount)
      return 1;
    else
      return 0;
   }

   render() { //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.

      console.log(this.rowCompare([1,2,3,4,1,3], [2,3,4,5,1,4] ));
     return (
       <div>
               <h1 id='title'>Практична робота 3 (Парето)</h1>
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
               <h1>Множина Парето: {this.findOptimal()}</h1>
               <table id='students'>
                  <tbody>
                    {this.renderTableResultHeader()}
                    {this.renderResult()}
                  </tbody>
               </table>

      </div>
     );
   }
}

export default Lab3
