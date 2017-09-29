import React from 'react';
import { shallow, render } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Table from '../Table';

describe('Table Component', function() {
  it('should render without error', function() {
    const table = shallow(<Table />);

    expect(table).to.have.lengthOf(1);
  });

  it('should pass arguments to expandedRowRender', function() {
    const expandedRowSpy = sinon.spy();

    const data = [
      {
        key: 'moo1',
        name: 'moo'
      },
      {
        key: 'moo2',
        name: 'moo'
      },
      {
        key: 'cow3',
        name: 'cow'
      }
    ];

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
      }
    ];

    render(
      <Table defaultExpandAllRows={true} dataSource={data} columns={columns} expandedRowRender={expandedRowSpy} />
    );

    data.forEach(datum => {
      expect(expandedRowSpy.calledWith(datum)).to.equal(true);
    });
  });
});
