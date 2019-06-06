import * as React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Picker from '../Picker';

describe('Picker', () => {
  it('should render without error', () => {
    const component = shallow(<Picker />);
    expect(component.exists()).to.equal(true);
  });
});
