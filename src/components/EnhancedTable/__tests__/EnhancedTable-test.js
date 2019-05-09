import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';

import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';

import { EnhancedTable } from '../EnhancedTable';
import { HORIZONTAL_BAR } from '../../../constants/emptyCell';
import { RowSelection } from '../enhancedTableUtil';

describe('Enhanced Table', () => {
  it('should render without error', () => {
    const component = shallow(<EnhancedTable />);
    expect(component.exists()).to.equal(true);
  });
});

/* Copyright 2018 128 Technology, Inc. */

describe('Enhanced Table', () => {
  it('should show no data text when data source is empty', () => {
    const component = mount(
      <EnhancedTable
        dataSource={[]}
        columns={[{ title: 'wuteva', dataIndex: 'name' }]}
        noDataText="NO DATA"
        classes={{}}
        loading={false}
        height={500}
        width={500}
      />
    );

    expect(
      component
        .find(TableCell)
        .at(1)
        .text()
    ).to.equal('NO DATA');
  });

  it('should render 4 rows (1 header 3 data) when 3 data items supplied', () => {
    const dataSource = [
      {
        name: 'dog'
      },
      {
        name: 'cat'
      },
      {
        name: 'moo moo cow'
      }
    ];

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name'
      }
    ];

    const component = mount(
      <EnhancedTable
        dataSource={dataSource}
        columns={columns}
        noDataText="NO DATA"
        classes={{}}
        loading={false}
        height={500}
        width={500}
      />
    );

    expect(component.find(TableCell)).to.have.lengthOf(4);
  });

  describe('cellRenderer', () => {
    it('should return a horizontal bar if data is undefined', () => {
      const datum = [{ age: 69 }];
      const col = [{ dataIndex: 'name' }, { dataIndex: 'age' }];

      const component = mount(
        <EnhancedTable
          dataSource={datum}
          columns={col}
          noDataText="NO DATA"
          classes={{}}
          loading={false}
          height={500}
          width={500}
        />
      );

      expect(
        component
          .find(TableCell)
          .at(2)
          .text()
      ).to.equal(HORIZONTAL_BAR);
    });

    it('should return a horizontal bar if data is null', () => {
      const datum = [{ name: null }];
      const col = [{ dataIndex: 'name' }];

      const component = mount(
        <EnhancedTable
          dataSource={datum}
          columns={col}
          noDataText="NO DATA"
          classes={{}}
          loading={false}
          height={500}
          width={500}
        />
      );

      expect(
        component
          .find(TableCell)
          .at(1)
          .text()
      ).to.equal(HORIZONTAL_BAR);
    });

    it('should return a horizontal bar if data is empty string', () => {
      const datum = [{ name: '' }];
      const col = [{ dataIndex: 'name' }];
      const component = mount(
        <EnhancedTable
          dataSource={datum}
          columns={col}
          noDataText="NO DATA"
          classes={{}}
          loading={false}
          height={500}
          width={500}
        />
      );

      expect(
        component
          .find(TableCell)
          .at(1)
          .text()
      ).to.equal(HORIZONTAL_BAR);
    });

    it('should return a shallow result', () => {
      const datum = [{ name: 'mY nAmE' }];
      const col = [{ dataIndex: 'name' }];

      const component = mount(
        <EnhancedTable
          dataSource={datum}
          columns={col}
          noDataText="NO DATA"
          classes={{}}
          loading={false}
          height={500}
          width={500}
        />
      );

      expect(
        component
          .find(TableCell)
          .at(1)
          .text()
      ).to.equal('mY nAmE');
    });

    it('should return a deep result', () => {
      const datum = [{ name: { first: 'mY' } }];
      const col = [{ dataIndex: ['name', 'first'] }];

      const component = mount(
        <EnhancedTable
          dataSource={datum}
          columns={col}
          noDataText="NO DATA"
          classes={{}}
          loading={false}
          height={500}
          width={500}
        />
      );

      expect(
        component
          .find(TableCell)
          .at(1)
          .text()
      ).to.equal('mY');
    });

    it('should run renderer if it is a function', () => {
      const datum = [{ name: { first: 'mY' } }];
      const col = [{ dataIndex: ['name', 'first'], render: cellText => `first name: ${cellText}` }];

      const component = mount(
        <EnhancedTable
          dataSource={datum}
          columns={col}
          noDataText="NO DATA"
          classes={{}}
          loading={false}
          height={500}
          width={500}
        />
      );

      expect(
        component
          .find(TableCell)
          .at(1)
          .text()
      ).to.equal('first name: mY');
    });
  });

  it('should render a column of Checkboxes if RowSelection is supplied', () => {
    const datum = [{ name: 'mY' }];
    const col = [{ dataIndex: 'name' }];

    const component = mount(
      <EnhancedTable
        dataSource={datum}
        columns={col}
        noDataText="NO DATA"
        classes={{}}
        loading={false}
        rowSelection={new RowSelection()}
        height={500}
        width={500}
      />
    );

    expect(component.find(Checkbox)).to.have.length(2);
  });

  it('should render a column of Radios if RowSelection is supplied with selectionType radio', () => {
    const datum = [{ name: 'mY' }];
    const col = [{ dataIndex: 'name' }];

    const component = mount(
      <EnhancedTable
        dataSource={datum}
        columns={col}
        noDataText="NO DATA"
        classes={{}}
        loading={false}
        rowSelection={new RowSelection({ selectorType: 'radio' })}
        height={500}
        width={500}
      />
    );

    expect(component.find(Radio)).to.have.length(1);
  });

  it('should set column width if defined', () => {
    const datum = [
      { name: "Swirvithan L'Gooding-Splatt", college: 'Saskatchewan U' },
      { name: 'Fartrell Cluggins', college: 'Arkansas U' }
    ];
    const col = [{ dataIndex: 'name', width: 200 }, { dataIndex: 'college' }];

    const component = mount(
      <EnhancedTable
        dataSource={datum}
        columns={col}
        noDataText="NO DATA"
        classes={{}}
        loading={false}
        height={500}
        width={500}
      />
    );

    expect(
      component
        .find(TableCell)
        .at(2)
        .prop('style').width
    ).to.equal(200);
  });

  it('should get selected row count using rowIsSelected function', () => {
    const selectedRows = ['a', 'b'];

    const columns = [
      {
        key: 'name',
        title: 'Name',
        dataIndex: 'name'
      }
    ];

    const dataSource = [
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
    ];

    const rowSelection = new RowSelection({
      rowIsSelected: (x, key) => selectedRows.includes(key)
    });

    const component = mount(
      <EnhancedTable
        dataSource={dataSource}
        columns={columns}
        noDataText="NO DATA"
        classes={{}}
        loading={false}
        rowSelection={rowSelection}
        rowKey={x => x.key}
        height={500}
        width={500}
      />
    );

    expect(component.instance().getSelectedRowCount()).to.equal(2);
  });

  it('should get all row keys on selection of all rows', done => {
    const expectedKeys = ['a', 'b', 'c'];

    const columns = [
      {
        key: 'name',
        title: 'Name',
        dataIndex: 'name'
      }
    ];

    const dataSource = [
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
    ];

    const rowSelection = new RowSelection({
      onSelectAll: (x, keys) => {
        expect(keys).to.deep.equal(expectedKeys);
        done();
      }
    });

    const component = mount(
      <EnhancedTable
        dataSource={dataSource}
        columns={columns}
        noDataText="NO DATA"
        classes={{}}
        loading={false}
        rowSelection={rowSelection}
        rowKey={x => x.key}
        height={500}
        width={500}
      />
    );

    component
      .find(TableCell)
      .at(0)
      .find(Checkbox)
      .prop('onChange')();
  });
});
