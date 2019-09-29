import React, { Component } from 'react'
import ChangeCount from './ChangeCount'

class Lab3 extends Component {

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
         let compare = this.rowCompare(temp[i], temp[j]) == 1 ? 1 : '';
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
     let str = "{ ";
     for (var i = 0; i < this.state.colCount; i++) {
       let tempArr = [];
       for (var j = 0; j < this.state.colCount; j++) {
         let compare = this.rowCompare(temp[i], temp[j]) == 1 ? 1 : '';
         tempArr.push(compare);
       }
       result.push(tempArr);
     }

     for (var i = 0; i < result.length; i++) {
       let flag = true;
       for (var j = 0; j < result[0].length; j++) {
         flag = result[j][i] == 1 ? false : true;
         if(!flag) break;
       }
       if(!flag) {
         if(i > 1)
          str += ", "
         str += "y" + i;
       }
     }

     str += " }"
     return str;
   }
   rowCompare(row1, row2) {
     let temp = 0;
     for (var i = 0; i < this.state.colCount; i++) {
       if(row1[i] > row2[i]) temp--;
       else if(row1[i] < row2[i]) temp++;
     }
     return temp;
   }

   render() { //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.


     return (
       <div>
               <h1 id='title'>Практична робота 3 (Парето)</h1>
               <div className="row">
                 <ChangeCount handleChangeCount ={this.handleChangeRowCount.bind(this)}
                                 count = {this.state.rowCount}
                                 title = "Число експертів = "/>
                 <ChangeCount handleChangeCount ={this.handleChangeColCount.bind(this)}
                                 count = {this.state.colCount}
                                 title = "Число альтернатив = "/>
               </div>
               <table id='students'>
                  <tbody>
                      {this.renderTableHeader()}
                      {this.renderTableWithExperts()}

                  </tbody>
               </table>
               <h1>Результати: {this.findOptimal()}</h1>
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
