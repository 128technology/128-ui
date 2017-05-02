import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Duration from '../Duration';

describe('Duration Component', function() {
  it('should render without error', function() {
    const duration = shallow(<Duration duration={0} />);

    expect(duration).to.have.lengthOf(1);
  });

  it('should render 0d 0h 0m 0s for duration 0', function() {
    const duration = shallow(<Duration duration={0} />);

    expect(duration.text()).to.equal('0d 0h 0m 0s');
  });

  it('should render years when days greaterthan or equal to 365', function() {
    const ms = 365 * 24 * 3600 * 1000;
    const duration = shallow(<Duration duration={ms} />);

    expect(duration.text()).to.equal('1y 0d 0h 0m 0s');
  });
});