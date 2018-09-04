import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Spinner from '../Spinner';

describe('Spinner', () => {
  it('applies appropriate classes for small size', () => {
    const component = shallow(<Spinner size="small" />);

    expect(component.hasClass('spinner--small')).to.equal(true);
  });

  it('applies appropriate classes for large size', () => {
    const component = shallow(<Spinner size="large" />);

    expect(component.hasClass('spinner--large')).to.equal(true);
  });

  it('applies appropriate class for default size (medium)', () => {
    const component = shallow(<Spinner />);

    expect(component.hasClass('spinner')).to.equal(true);
    expect(component.hasClass('spinner--large')).to.equal(false);
    expect(component.hasClass('spinner--small')).to.equal(false);
  });
});
