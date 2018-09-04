import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import EnhancedTable from '../EnhancedTable';

describe('Enhanced Table', () => {
  it('should render without error', () => {
    const component = shallow(<EnhancedTable />);
    expect(component.exists()).to.equal(true);
  });
});
