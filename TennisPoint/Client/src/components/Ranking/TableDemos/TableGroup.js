import { BootstrapTable, TableHeaderColumn, ButtonGroup } from 'react-bootstrap-table';

import React ,{ Component} from 'react';

const products = [];

function addProducts(quantity) {
  const startId = products.length;
  for (let i = 0; i < quantity; i++) {
    const id = startId + i;
    products.push({
      id: id,
      name: 'Item name ' + id,
      price: 2100 + i
    });
  }
}

addProducts(5);

export default class CustomButtonGroup extends React.Component {

  createCustomButtonGroup = props => {
    return (
      <ButtonGroup className='my-custom-class' sizeClass='btn-group-md'>
        { props.showSelectedOnlyBtn }
        { props.exportCSVBtn }
        { props.insertBtn }
        { props.deleteBtn }
        <button type='button'
          className={ `btn btn-primary` }>
          MyCustomBtn
        </button>
      </ButtonGroup>
    );
  }

  render() {
    const selectRow = {
      mode: 'checkbox'
    };
    const options = {
      btnGroup: this.createCustomButtonGroup
    };
    return (
      <BootstrapTable data={ products }
        options={ options }
        selectRow={ selectRow }
        insertRow
        deleteRow
        exportCSV>
        <TableHeaderColumn dataField='id' isKey={ true }>Product ID</TableHeaderColumn>
        <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
        <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}