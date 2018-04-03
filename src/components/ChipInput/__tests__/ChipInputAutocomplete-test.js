import React from 'react';
import { expect } from 'chai';

import ChipInputAutocomplete from '../ChipInputAutocomplete';
import { mountWithMuiTheme } from '../../../utils/testUtil';

describe('Chip Input Autocomplete', function() {
  it('should focus input when inputFocused prop is set', function() {
    const component = mountWithMuiTheme(
      <ChipInputAutocomplete inputFocused={true} items={[]} getItemValue={() => {}} renderItem={() => {}} />
    );

    const elem = component.find('input').getDOMNode();
    const focusedElem = document.activeElement;

    expect(focusedElem).to.equal(elem);
  });

  it('should focus input when inputFocused prop is updated', function() {
    const component = mountWithMuiTheme(
      <ChipInputAutocomplete inputFocused={false} items={[]} getItemValue={() => {}} renderItem={() => {}} />
    );

    component.setProps({ inputFocused: true });
    const elem = component.find('input').getDOMNode();
    const focusedElem = document.activeElement;

    expect(focusedElem).to.equal(elem);
  });
});
