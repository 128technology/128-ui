import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';

import ChipInputChip from '../ChipInputChip';
import { mountWithMuiTheme } from '../../../utils/testUtil';

describe('Chip Input Chip', function() {
  it('should call onDelete when backspace is hit', function() {
    const deleteSpy = sinon.spy();
    const component = mountWithMuiTheme(<ChipInputChip onDelete={deleteSpy} />);

    component.simulate('keyDown', { key: 'Backspace', keyCode: 8, which: 8 });

    expect(deleteSpy.calledOnce).to.equal(true);
  });

  it('should call onKeyDown when keyDown event is fired', function() {
    const keyDownSpy = sinon.spy();
    const component = mountWithMuiTheme(<ChipInputChip onKeyDown={keyDownSpy} />);

    component.simulate('keyDown', { key: 'Tab', keyCode: 9, which: 9 });

    expect(keyDownSpy.calledOnce).to.equal(true);
  });

  it('should be focusable by prop', function() {
    const component = mountWithMuiTheme(<ChipInputChip focused={true} />);
    const elem = component.find('.ui-128--chip-input-chip');
    const focusedElem = document.activeElement;

    expect(elem.matchesElement(focusedElem)).to.equal(true);
  });
});
