import * as React from 'react';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { Day } from '../Day';

describe('Day', () => {
  it('should use renderer when set', () => {
    const component = shallow(
      <Day classes={{} as any} renderer={(date, props, symbol) => <div className="day-wrapper">{symbol}</div>} />
    );
    expect(component.find('.day-wrapper').exists()).to.equal(true);
  });

  it('renderer should get passed three arguments', () => {
    const renderer = sinon.spy();
    shallow(<Day classes={{} as any} renderer={renderer} />);
    expect(renderer.args[0]).to.have.lengthOf(3);
  });
});
