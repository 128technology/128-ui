/* Copyright 2018 128 Technology, Inc. */

import React from 'react';
import Immutable from 'immutable';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { EnhancedTableHead } from '../EnhancedTableHead';
import { RowSelection } from '../enhancedTableUtil';

describe('Enhanced Table Head', () => {
  it('should get selected row count using isRowSelected function', () => {
    const selectedRows = Immutable.Set(['a', 'b']);

    const columns = Immutable.fromJS([
      {
        key: 'name',
        title: 'Name',
        dataIndex: 'name'
      }
    ]);

    const dataSource = Immutable.fromJS([
      {
        key: 'a',
        name: 'cat'
      },
      {
        key: 'b',
        name: 'dog'
      },
      {
        key: 'c',
        name: 'bird'
      }
    ]);

    const rowSelection = new RowSelection({
      rowIsSelected: (x, key) => selectedRows.includes(key)
    });

    const component = shallow(
      <EnhancedTableHead
        dataSource={dataSource}
        columns={columns}
        rowSelection={rowSelection}
        rowKey={x => x.get('key')}
      />
    );

    expect(component.instance().getSelectedRowCount()).to.equal(2);
  });

  it('should get all row keys on selection of all rows', done => {
    const expectedKeys = Immutable.Set(['a', 'b', 'c']);

    const columns = Immutable.fromJS([
      {
        key: 'name',
        title: 'Name',
        dataIndex: 'name'
      }
    ]);

    const dataSource = Immutable.fromJS([
      {
        key: 'a',
        name: 'cat'
      },
      {
        key: 'b',
        name: 'dog'
      },
      {
        key: 'c',
        name: 'bird'
      }
    ]);

    const rowSelection = new RowSelection({
      onSelectAll: (x, keys) => {
        expect(keys).to.deep.equal(expectedKeys);
        done();
      }
    });

    const component = shallow(
      <EnhancedTableHead
        dataSource={dataSource}
        columns={columns}
        rowSelection={rowSelection}
        rowKey={x => x.get('key')}
      />
    );

    component
      .find(TableCell)
      .at(0)
      .find(Checkbox)
      .simulate('change');
  });
});
