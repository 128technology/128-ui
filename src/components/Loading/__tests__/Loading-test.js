/*********************************************************************
 * Copyright (c) 2017 128 Technology, Inc.
 * All rights reserved.
 ********************************************************************/

import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Loading from '../Loading';
import { Spinner } from '../../Spinner';

describe('Loading', () => {
  it('should apply default classes', () => {
    const component = shallow(<Loading />);
    expect(component.hasClass('loading')).to.equal(true);
  });

  it('displays a spinner', () => {
    const component = shallow(<Loading />);
    expect(component.find(Spinner)).to.have.lengthOf(1);
  });

  it('displays loading text', () => {
    const component = shallow(<Loading loadingText="HOLD ON!" />);
    expect(component.find('.loading__text').text()).to.equal('HOLD ON!');
  });

  it('applies the correct classes for horizontal option', () => {
    const component = shallow(<Loading horizontal={true} />);
    expect(component.hasClass('loading--horizontal')).to.equal(true);
  });

  it('applies the correct classes for block option', () => {
    const component = shallow(<Loading block={true} />);
    expect(component.hasClass('loading--block')).to.equal(true);
  });

  it('applies the correct classes for small size', () => {
    const component = shallow(<Loading size="small" />);
    expect(component.hasClass('loading--small')).to.equal(true);
  });

  it('applies the correct classes for large size', () => {
    const component = shallow(<Loading size="large" />);
    expect(component.hasClass('loading--large')).to.equal(true);
  });

  it('should hide loading text', () => {
    const component = shallow(<Loading showLoadingText={false} />);
    expect(component.find('.loading__text').exists()).to.equal(false);
  });
});
