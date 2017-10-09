import React from 'react';
import { expect } from 'chai';

import ChipInputAutocomplete from '../ChipInputAutocomplete';
import { mountWithMuiTheme } from '../../../utils/testUtil';

describe('Chip Input Autocomplete', function() {
  it('should focus input when inputFocused prop is set', function() {
    const component = mountWithMuiTheme(
      <ChipInputAutocomplete inputFocused={true} items={[]} getItemValue={() => {}} renderItem={() => {}} />
    );

    const elem = component.find('input');
    const focusedElem = document.activeElement;

    expect(elem.matchesElement(focusedElem)).to.equal(true);
  });

  it('should focus input when inputFocused prop is updated', function() {
    const component = mountWithMuiTheme(
      <ChipInputAutocomplete inputFocused={false} items={[]} getItemValue={() => {}} renderItem={() => {}} />
    );

    component.setProps({ inputFocused: true });
    const elem = component.find('input');
    const focusedElem = document.activeElement;

    expect(elem.matchesElement(focusedElem)).to.equal(true);
  });
});
