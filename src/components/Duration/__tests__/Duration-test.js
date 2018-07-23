import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Duration from '../Duration';

describe('Duration Component', () => {
  it('should render without error', () => {
    const duration = shallow(<Duration duration={0} />);
    expect(duration).to.have.lengthOf(1);
  });

  it('should render 0d 0h 0m 0s for duration 0', () => {
    const duration = shallow(<Duration duration={0} />);
    expect(duration.text()).to.equal('0d 0h 0m 0s');
  });

  it('should render years when days greaterthan or equal to 365', () => {
    const ms = 365 * 24 * 3600 * 1000;
    const duration = shallow(<Duration duration={ms} />);
    expect(duration.text()).to.equal('1y 0d 0h 0m 0s');
  });

  it('should render a duration', () => {
    const ms = 278 * 24 * 3600 * 1000 + 7 * 3600 * 1000 + 5 * 60 * 1000;
    const duration = shallow(<Duration duration={ms} />);
    expect(duration.text()).to.equal('278d 7h 5m 0s');
  });

  it('shoul render 0d 0h 0m 0s for duration < 0', () => {
    const duration = shallow(<Duration duration={-1} />);
    expect(duration.text()).to.equal('0d 0h 0m 0s');
  });
});
