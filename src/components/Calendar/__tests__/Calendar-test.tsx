import * as React from 'react';
import * as moment from 'moment';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Calendar from '../Calendar';
import Week from '../Week';

describe('Calendar', () => {
  it('should render a calendar with enough weeks to cover all the days within a month', () => {
    const component = shallow(<Calendar date={moment('2018-09-18T15:38:19.451Z')} />);
    expect(component.find(Week)).to.have.lengthOf(6);
  });
});
