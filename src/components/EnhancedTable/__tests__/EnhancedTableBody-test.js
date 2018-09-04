/* Copyright 2018 128 Technology, Inc. */

import React from 'react';
import Immutable from 'immutable';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { EnhancedTableBody } from '../EnhancedTableBody';
import { HORIZONTAL_BAR } from '../../../constants/emptyCell';
import { RowSelection } from '../enhancedTableUtil';

describe('Enhanced Table Body', () => {
  it('should show no data text when data source is empty', () => {
    const component = shallow(
      <EnhancedTableBody dataSource={Immutable.List()} columns={Immutable.List()} noDataText="NO DATA" />
    );
    expect(component.find(TableCell).prop('children')).to.equal('NO DATA');
  });

  it('should span no data text across entire table', () => {
    const component = shallow(
      <EnhancedTableBody
        dataSource={Immutable.List()}
        columns={Immutable.fromJS([{}, {}, {}, {}])}
        rowSelection={new RowSelection()}
        noDataText="NO DATA"
      />
    );

    expect(component.find(TableCell).prop('colSpan')).to.equal(5);
  });

  it('should splice data source if rowsPerPage is set', () => {
    const dataSource = Immutable.fromJS([
      {
        name: 'dog'
      },
      {
        name: 'cat'
      },
      {
        name: 'moo moo cow'
      },
      {
        name: 'pig'
      },
      {
        name: 'horse'
      },
      {
        name: 'snek'
      }
    ]);

    const columns = Immutable.fromJS([
      {
        title: 'Name',
        dataIndex: 'name'
      }
    ]);

    const component = shallow(<EnhancedTableBody dataSource={dataSource} columns={columns} rowsPerPage={5} page={0} />);
    expect(component.find(TableBody).find(TableRow)).to.have.lengthOf(5);
    component.setProps({ page: 1 });
    expect(component.find(TableBody).find(TableRow)).to.have.lengthOf(1);
  });

  describe('renderCell', () => {
    it('should return a horizontal bar if data is undefined', () => {
      const datum = Immutable.Map();
      const col = Immutable.Map({ dataIndex: 'name' });

      const component = shallow(<EnhancedTableBody />);
      expect(component.instance().renderCell(datum, col)).to.equal(HORIZONTAL_BAR);
    });

    it('should return a horizontal bar if data is null', () => {
      const datum = Immutable.Map({ name: null });
      const col = Immutable.Map({ dataIndex: 'name' });

      const component = shallow(<EnhancedTableBody />);
      expect(component.instance().renderCell(datum, col)).to.equal(HORIZONTAL_BAR);
    });

    it('should return a horizontal bar if data is empty string', () => {
      const datum = Immutable.Map({ name: '' });
      const col = Immutable.Map({ dataIndex: 'name' });

      const component = shallow(<EnhancedTableBody />);
      expect(component.instance().renderCell(datum, col)).to.equal(HORIZONTAL_BAR);
    });

    it('should return a shallow result', () => {
      const datum = Immutable.fromJS({ name: 'mY nAmE' });
      const col = Immutable.fromJS({ dataIndex: 'name' });

      const component = shallow(<EnhancedTableBody />);
      expect(component.instance().renderCell(datum, col)).to.equal('mY nAmE');
    });

    it('should return a deep result', () => {
      const datum = Immutable.fromJS({ name: { first: 'mY' } });
      const col = Immutable.fromJS({ dataIndex: ['name', 'first'] });

      const component = shallow(<EnhancedTableBody />);
      expect(component.instance().renderCell(datum, col)).to.equal('mY');
    });

    it('should run renderer if it is a function', () => {
      const datum = Immutable.fromJS({ name: { first: 'mY' } });
      const col = Immutable.fromJS({ dataIndex: ['name', 'first'], render: cellText => `first name: ${cellText}` });

      const component = shallow(<EnhancedTableBody />);
      expect(component.instance().renderCell(datum, col)).to.equal('first name: mY');
    });
  });
});
