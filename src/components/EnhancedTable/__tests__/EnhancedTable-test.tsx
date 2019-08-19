import * as React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';

import TableCell from '@material-ui/core/TableCell';
import MuiTable, { IHeaderClickProps } from '@128technology/mui-virtualized-table';

import EnhancedTable from '../EnhancedTable';

/* Copyright 2018 128 Technology, Inc. */
describe('Enhanced Table', () => {
  it('should render without error', () => {
    const component = shallow(<EnhancedTable columns={[]} data={[]} />);
    expect(component.exists()).to.equal(true);
  });

  it('should render 4 rows (1 header 3 data) when 3 data items supplied', () => {
    const data = [
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
        header: 'Name',
        name: 'name'
      }
    ];

    const component = mount(<EnhancedTable data={data} columns={columns} loading={false} height={500} width={500} />);

    expect(component.find(TableCell)).to.have.lengthOf(4);
  });

  it('should should properly sort data', () => {
    const data = [
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
        header: 'Name',
        name: 'name'
      }
    ];

    const component = mount(
      <EnhancedTable
        defaultOrderBy="name"
        defaultOrderDirection="desc"
        data={data}
        columns={columns}
        loading={false}
        height={500}
        width={500}
      />
    );
    const cells = component.find(TableCell);
    expect(cells.at(1).text()).to.equal('moo moo cow');
    expect(cells.at(2).text()).to.equal('dog');
    expect(cells.at(3).text()).to.equal('cat');
  });

  it('should re-sort data on header click', () => {
    const data = [
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
        header: 'Name',
        name: 'name'
      }
    ];

    const component = mount(<EnhancedTable data={data} columns={columns} loading={false} height={500} width={500} />);
    const cells = component.find(TableCell);
    component.find(MuiTable).prop('onHeaderClick')!({ a: 'a' } as any, { column: { name: 'name' } });
    expect(cells.at(1).text()).to.equal('moo moo cow');
    expect(cells.at(2).text()).to.equal('dog');
    expect(cells.at(3).text()).to.equal('cat');
  });

  it('should sort based on custom sorter function', () => {
    const data = [
      {
        softwareVersion: '4.2.0'
      },
      {
        softwareVersion: '2.2.0'
      },
      {
        softwareVersion: '3.2.0'
      }
    ];

    const columns = [
      {
        header: 'Version',
        name: 'softwareVersion',
        customSorter: ({ orderDirection }: any) => (a: any, b: any) => {
          const s =
            parseInt(a.softwareVersion.split('.')[0], 10) > parseInt(b.softwareVersion.split('.')[0], 10) ? 1 : -1;
          return s ? (orderDirection === 'desc' ? s * -1 : s) : 0;
        }
      }
    ];

    const component = mount(
      <EnhancedTable
        defaultOrderDirection={'desc'}
        defaultOrderBy={'softwareVersion'}
        data={data}
        columns={columns}
        loading={false}
        height={500}
        width={500}
      />
    );
    const cells = component.find(TableCell);
    expect(cells.at(1).text()).to.equal('4.2.0');
    expect(cells.at(2).text()).to.equal('3.2.0');
    expect(cells.at(3).text()).to.equal('2.2.0');
  });
});
