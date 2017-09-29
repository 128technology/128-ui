import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Subheader from 'material-ui/Subheader';
import MenuItem from 'material-ui/MenuItem';

import ChipInput, { removeValueAtIndex } from '../ChipInput';
import { mountWithMuiTheme } from '../../../utils/testUtil';

const dataSource = [{
  key: 'some-key',
  label: 'some-label',
  value: 'some-value',
  type: 'SOMETHING'
}, {
  key: 'some-key-2',
  label: 'some-label-2',
  value: 'some-value-2',
  type: 'SOMETHING'
}, {
  key: 'other',
  label: 'other',
  value: 'other',
  type: 'OTHER'
}];

describe('Chip Input', function() {
  it('should render without error', function() {
    const component = shallow(<ChipInput dataSource={dataSource} />);

    expect(component.exists()).to.equal(true);
  });

  describe('Event Handlers', function() {
    it('it should set input focused', function() {
      const component = mountWithMuiTheme(<ChipInput dataSource={dataSource} />);
      const input = component.find('input');
  
      input.simulate('focus');
  
      expect(component.state().inputFocused).to.equal(true);
    });

    it('it should set focused chip index input->leftArrow', function() {
      const component = mountWithMuiTheme(<ChipInput dataSource={dataSource} selectedKeys={['some-key']} />);
      const input = component.find('input');
  
      input.simulate('focus');
      input.simulate('keyDown', { key: 'LeftArrow', which: 37, keyCode: 37 });
  
      expect(component.state().focusedChipIndex).to.equal(0);
    });

    it('it should set focused chip index chip->leftArrow', function() {
      const component = mountWithMuiTheme(<ChipInput dataSource={dataSource} selectedKeys={['some-key', 'some-key-2']} />);
      const lastChip = component.find('.ui-128--chip-input-chip').last();
  
      lastChip.simulate('focus');
      lastChip.simulate('keyDown', { key: 'LeftArrow', which: 37, keyCode: 37 });

      expect(component.state().focusedChipIndex).to.equal(0);
    });

    it('it should set focused chip index chip->shift + tab', function() {
      const component = mountWithMuiTheme(<ChipInput dataSource={dataSource} selectedKeys={['some-key', 'some-key-2']} />);
      const lastChip = component.find('.ui-128--chip-input-chip').last();
  
      lastChip.simulate('focus');
      lastChip.simulate('keyDown', { key: 'Tab', which: 9, keyCode: 9, shiftKey: true });

      expect(component.state().focusedChipIndex).to.equal(0);
    });

    it('it should set focused chip index chip->tab', function() {
      const component = mountWithMuiTheme(<ChipInput dataSource={dataSource} selectedKeys={['some-key', 'some-key-2']} />);
      const lastChip = component.find('.ui-128--chip-input-chip').first();
  
      lastChip.simulate('focus');
      lastChip.simulate('keyDown', { key: 'Tab', which: 9, keyCode: 9, shiftKey: false });

      expect(component.state().focusedChipIndex).to.equal(1);
    });

    it('it should focus input chip->rightArrow when last chip is focused', function() {
      const component = mountWithMuiTheme(<ChipInput dataSource={dataSource} selectedKeys={['some-key', 'some-key-2']} />);
      const lastChip = component.find('.ui-128--chip-input-chip').last();
  
      lastChip.simulate('focus');
      lastChip.simulate('keyDown', { key: 'RightArrow', which: 39, keyCode: 39 });

      expect(component.state().focusedChipIndex).to.equal(null);
      expect(component.state().inputFocused).to.equal(true);
    });

    it('it should focus input chip->tab when last chip is focused', function() {
      const component = mountWithMuiTheme(<ChipInput dataSource={dataSource} selectedKeys={['some-key', 'some-key-2']} />);
      const lastChip = component.find('.ui-128--chip-input-chip').last();
  
      lastChip.simulate('focus');
      lastChip.simulate('keyDown', { key: 'Tab', which: 9, keyCode: 9 });

      expect(component.state().focusedChipIndex).to.equal(null);
      expect(component.state().inputFocused).to.equal(true);
    });

    it('it should set focus chip index when chip is focused', function() {
      const component = mountWithMuiTheme(<ChipInput dataSource={dataSource} selectedKeys={['some-key', 'some-key-2']} />);
      const lastChip = component.find('.ui-128--chip-input-chip').last();
  
      lastChip.simulate('focus');

      expect(component.state().focusedChipIndex).to.equal(1);
    });

    it('it should focus next chip on chip->delete when more than one selected value', function() {
      const component = mountWithMuiTheme(<ChipInput dataSource={dataSource} selectedKeys={['some-key', 'some-key-2']} />);
      const lastChip = component.find('.ui-128--chip-input-chip').first();
  
      lastChip.simulate('focus');
      lastChip.simulate('keyDown', { key: 'Delete', which: 8, keyCode: 8 });

      expect(component.state().focusedChipIndex).to.equal(0);
    });

    it('it should focus input on chip->delete when only one selected value', function() {
      const component = mountWithMuiTheme(<ChipInput dataSource={dataSource} selectedKeys={['some-key']} />);
      const lastChip = component.find('.ui-128--chip-input-chip').first();
  
      lastChip.simulate('focus');
      lastChip.simulate('keyDown', { key: 'Delete', which: 8, keyCode: 8 });

      expect(component.state().focusedChipIndex).to.equal(null);
      expect(component.state().inputFocused).to.equal(true);
    });

    it('it should delete focused chip chip->delete', function() {
      const component = mountWithMuiTheme(<ChipInput dataSource={dataSource} selectedKeys={['some-key', 'some-key-2']} />);
      const lastChip = component.find('.ui-128--chip-input-chip').first();
  
      lastChip.simulate('focus');
      lastChip.simulate('keyDown', { key: 'Delete', which: 8, keyCode: 8 });

      expect(component.state().selectedValues[0].key).deep.equals(dataSource[1].key);
    });

    it('it should delete last chip input->delete', function() {
      const component = mountWithMuiTheme(<ChipInput dataSource={dataSource} selectedKeys={['some-key', 'some-key-2']} />);
      const input = component.find('input');
  
      input.simulate('focus');
      input.simulate('keyDown', { key: 'Delete', which: 8, keyCode: 8 });

      expect(component.state().selectedValues).has.lengthOf(1);
      expect(component.state().selectedValues[0].key).to.equal('some-key');
    });

    it('it should append chip input->enter when valid value entered', function() {
      const component = mountWithMuiTheme(<ChipInput dataSource={dataSource} />);
      const input = component.find('input');
  
      input.simulate('focus');
      input.simulate('change', { target: { value: 'some-' }});
      input.simulate('keyDown', { key: 'Enter', which: 13, keyCode: 13 });

      expect(component.state().selectedValues).has.lengthOf(1);
      expect(component.state().selectedValues[0].key).to.equal('some-key');
    });

    it('it should not append a chip input->enter when a non-valid value entered', function() {
      const component = mountWithMuiTheme(<ChipInput dataSource={dataSource} />);
      const input = component.find('input');
  
      input.simulate('focus');
      input.simulate('change', { target: { value: 'a' }});
      input.simulate('keyDown', { key: 'Enter', which: 13, keyCode: 13 });

      expect(component.state().selectedValues).has.lengthOf(0);
    });
  });

  describe('Utils', function() {
    describe('removeValueAtIndex', function() {
      it('should remove a value at an index', function() {
        const arr = [0, 1, 2, 3, 4, 5];
        expect(removeValueAtIndex(arr, 1)).to.deep.equal([0, 2, 3, 4, 5]);
      });

      it('should return a different array instance with the same values for an index > array length', function() {
        const arr = [0, 1, 2, 3, 4, 5];
        const newArr = removeValueAtIndex(arr, 1000);
        
        expect(newArr).to.not.equal(arr);
        expect(newArr).to.deep.equal([0, 1, 2, 3, 4, 5]);
      });

      it('should return a different array instance with the same values for an index < 0', function() {
        const arr = [0, 1, 2, 3, 4, 5];
        const newArr = removeValueAtIndex(arr, -1);

        expect(newArr).to.not.equal(arr);
        expect(newArr).to.deep.equal([0, 1, 2, 3, 4, 5]);
      });
    });
  });

  describe('Presentation', function() {
    it('should render an an icon element', function() {
      const component = mountWithMuiTheme(<ChipInput dataSource={dataSource} icon={<div className="some-icon" />} />);
      const icon = component.find('.some-icon');

      expect(icon.exists()).to.equal(true);
    });

    it('should create menu groups when groupBy function is supplied', function() {
      const groupBy = (obj) => obj.originalDatum.type; 
      const component = mountWithMuiTheme(<ChipInput dataSource={dataSource} groupBy={groupBy} />);

      component.find('input').simulate('focus');
      const subheaders = component.find(Subheader);

      expect(subheaders).to.have.lengthOf(2);
    });

    it('should show menu items that match search criteria ignoring case', function() {
      const component = mountWithMuiTheme(<ChipInput dataSource={dataSource} />);
      const input = component.find('input');

      input.simulate('focus');
      input.simulate('change', { target: { value: 'OtHeR' }});

      const menuItems = component.find(MenuItem).first();

      expect(menuItems.text()).to.equal('other');
    });
  });
});
