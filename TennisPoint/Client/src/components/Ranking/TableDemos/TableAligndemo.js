import React ,{ Component} from 'react';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const products = [{
    id: 1,
    name: "Item name 1",
    price: 100
},{
    id: 2,
    name: "Item name 2",
    price: 100
}];
// It's a data format example.
const priceFormatter = (cell, row) => {
    return '<i class="glyphicon glyphicon-usd"></i> ' + cell;

}




export default class ExampleTable extends React.Component {

    constructor(props) {
      super(props);
      this.thClassName = this.thClassName.bind(this);
      this.tdClassName = this.tdClassName.bind(this);
      this.onSortChange = this.onSortChange.bind(this);
      this.state = {
        currSortColumnIdx: null
      };
    }
  
    tdClassName(fieldValue, row, rowIdx, colIdx) {
      if (colIdx === this.state.currSortColumnIdx) {
        return 'my-custom-class';
      }
      return null;
    }
  
    thClassName(colIdx) {
      if (colIdx === this.state.currSortColumnIdx) {
        return 'my-custom-class';
      }
      return null;
    }


  
    onSortChange(sortName, sortOrder) {
      // a little hard code, but you can make it better
      let currSortColumnIdx;
      if (sortName === 'id') {
        currSortColumnIdx = 0;
      } else if (sortName === 'name') {
        currSortColumnIdx = 1;
      } else if (sortName === 'price') {
        currSortColumnIdx = 2;
      }
      this.setState({ currSortColumnIdx });
    }
  
    render() {
      const options = {
        onSortChange: this.onSortChange
      };
  
      return (
        <BootstrapTable data={ products } options={ options }>
            <TableHeaderColumn dataField='id' isKey={ true } dataSort
              columnClassName={ this.tdClassName }
              className={ () => this.thClassName(0) }>
              Product ID
            </TableHeaderColumn>
            <TableHeaderColumn dataField='name' dataSort
              columnClassName={ this.tdClassName }
              className={ () => this.thClassName(1) }>
              Product Name
            </TableHeaderColumn>
            <TableHeaderColumn dataField='price' dataSort
              columnClassName={ this.tdClassName }
              className={ () => this.thClassName(2) }>
              Product Price
            </TableHeaderColumn>
        </BootstrapTable>
      );
    }
  }