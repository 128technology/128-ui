import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { Day } from '../Day';

describe('Day', () => {
  it('should use renderer when set', () => {
    const renderer = (date, props, symbol) => <div className="day-wrapper">{symbol}</div>;
    const component = shallow(<Day renderer={renderer} />);
    expect(component.find('.day-wrapper').exists()).to.equal(true);
  });

  it('renderer should get passed three arguments', () => {
    const renderer = sinon.spy();
    shallow(<Day renderer={renderer} />);
    expect(renderer.args[0]).to.have.lengthOf(3);
  });
});
