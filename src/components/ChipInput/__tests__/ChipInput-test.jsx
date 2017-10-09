import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Subheader from 'material-ui/Subheader';
import MenuItem from 'material-ui/MenuItem';

import ChipInput from '../ChipInput';
import { mountWithMuiTheme } from '../../../utils/testUtil';

const dataSource = [
  {
    key: 'some-key',
    label: 'some-label',
    value: 'some-value',
    type: 'SOMETHING'
  },
  {
    key: 'some-key-2',
    label: 'some-label-2',
    value: 'some-value-2',
    type: 'SOMETHING'
  },
  {
    key: 'other',
    label: 'other',
    value: 'other',
    type: 'OTHER'
  }
];

describe('Chip Input', function() {
  it('should render without error', function() {
    const component = shallow(<ChipInput dataSource={dataSource} />);

    expect(component.exists()).to.equal(true);
  });

  it('should update the data source', function() {
    const component = mountWithMuiTheme(<ChipInput dataSource={dataSource} selectedKeys={[]} />);

    expect(Object.entries(component.state().dataSourceMap)).to.have.lengthOf(3);

    component.setProps({ dataSource: dataSource.slice(0, 1) });

    expect(Object.entries(component.state().dataSourceMap)).to.have.lengthOf(1);
  });

  it('should update the data source config', function() {
    const component = mountWithMuiTheme(<ChipInput dataSource={dataSource} selectedKeys={[]} />);

    component.setProps({ dataSourceConfig: { key: 'label' } });
    expect(component.state().dataSourceMap).to.haveOwnProperty('some-label');
  });

  describe('Events', function() {
    it('should set input focused', function() {
      const component = mountWithMuiTheme(<ChipInput dataSource={dataSource} />);
      const input = component.find('input');

      input.simulate('focus');

      expect(component.state().inputFocused).to.equal(true);
    });

    it('should set focused chip key input->leftArrow', function() {
      const component = mountWithMuiTheme(<ChipInput dataSource={dataSource} selectedKeys={['some-key']} />);
      const input = component.find('input');

      input.simulate('focus');
      input.simulate('keyDown', { key: 'LeftArrow', which: 37, keyCode: 37 });

      expect(component.state().focusedChipKey).to.equal('some-key');
    });

    it('should set focused chip key chip->leftArrow', function() {
      const component = mountWithMuiTheme(
        <ChipInput dataSource={dataSource} selectedKeys={['some-key', 'some-key-2']} />
      );
      const lastChip = component.find('.ui-128--chip-input-chip').last();

      lastChip.simulate('focus');
      lastChip.simulate('keyDown', { key: 'LeftArrow', which: 37, keyCode: 37 });

      expect(component.state().focusedChipKey).to.equal('some-key');
    });

    it('should set focused chip key chip->shift + tab', function() {
      const component = mountWithMuiTheme(
        <ChipInput dataSource={dataSource} selectedKeys={['some-key', 'some-key-2']} />
      );
      const lastChip = component.find('.ui-128--chip-input-chip').last();

      lastChip.simulate('focus');
      lastChip.simulate('keyDown', { key: 'Tab', which: 9, keyCode: 9, shiftKey: true });

      expect(component.state().focusedChipKey).to.equal('some-key');
    });

    it('should set focused chip key chip->tab', function() {
      const component = mountWithMuiTheme(
        <ChipInput dataSource={dataSource} selectedKeys={['some-key', 'some-key-2']} />
      );
      const lastChip = component.find('.ui-128--chip-input-chip').first();

      lastChip.simulate('focus');
      lastChip.simulate('keyDown', { key: 'Tab', which: 9, keyCode: 9, shiftKey: false });

      expect(component.state().focusedChipKey).to.equal('some-key-2');
    });

    it('should focus input chip->rightArrow when last chip is focused', function() {
      const component = mountWithMuiTheme(
        <ChipInput dataSource={dataSource} selectedKeys={['some-key', 'some-key-2']} />
      );
      const lastChip = component.find('.ui-128--chip-input-chip').last();

      lastChip.simulate('focus');
      lastChip.simulate('keyDown', { key: 'RightArrow', which: 39, keyCode: 39 });

      expect(component.state().focusedChipKey).to.equal(null);
      expect(component.state().inputFocused).to.equal(true);
    });

    it('should focus input chip->tab when last chip is focused', function() {
      const component = mountWithMuiTheme(
        <ChipInput dataSource={dataSource} selectedKeys={['some-key', 'some-key-2']} />
      );
      const lastChip = component.find('.ui-128--chip-input-chip').last();

      lastChip.simulate('focus');
      lastChip.simulate('keyDown', { key: 'Tab', which: 9, keyCode: 9 });

      expect(component.state().focusedChipKey).to.equal(null);
      expect(component.state().inputFocused).to.equal(true);
    });

    it('should set focus chip key when chip is focused', function() {
      const component = mountWithMuiTheme(
        <ChipInput dataSource={dataSource} selectedKeys={['some-key', 'some-key-2']} />
      );
      const lastChip = component.find('.ui-128--chip-input-chip').last();

      lastChip.simulate('focus');

      expect(component.state().focusedChipKey).to.equal('some-key-2');
    });

    it('should focus next chip on chip->delete when more than one selected value', function() {
      const component = mountWithMuiTheme(
        <ChipInput dataSource={dataSource} selectedKeys={['some-key', 'some-key-2']} />
      );
      const firstChip = component.find('.ui-128--chip-input-chip').first();

      firstChip.simulate('focus');
      firstChip.simulate('keyDown', { key: 'Delete', which: 8, keyCode: 8 });

      expect(component.state().focusedChipKey).to.equal('some-key');
    });

    it('should focus input on chip->delete when only one selected value', function() {
      const component = mountWithMuiTheme(<ChipInput dataSource={dataSource} defaultSelectedKeys={['some-key']} />);
      const firstChip = component.find('.ui-128--chip-input-chip').first();

      firstChip.simulate('focus');
      firstChip.simulate('keyDown', { key: 'Delete', which: 8, keyCode: 8 });

      expect(component.state().focusedChipKey).to.equal(null);
      expect(component.state().inputFocused).to.equal(true);
    });

    it('should delete focused chip chip->delete', function() {
      const component = mountWithMuiTheme(
        <ChipInput dataSource={dataSource} defaultSelectedKeys={['some-key', 'some-key-2']} />
      );
      const firstChip = component.find('.ui-128--chip-input-chip').first();

      firstChip.simulate('focus');
      firstChip.simulate('keyDown', { key: 'Delete', which: 8, keyCode: 8 });

      expect(component.state().selectedKeys).to.have.lengthOf(1);
      expect(component.state().selectedKeys[0]).deep.equals('some-key-2');
    });

    it('should delete last chip input->delete', function() {
      const component = mountWithMuiTheme(
        <ChipInput dataSource={dataSource} defaultSelectedKeys={['some-key', 'some-key-2']} />
      );
      const input = component.find('input');

      input.simulate('focus');
      input.simulate('keyDown', { key: 'Delete', which: 8, keyCode: 8 });

      expect(component.state().selectedKeys).has.lengthOf(1);
      expect(component.state().selectedKeys[0]).to.equal('some-key');
    });

    it('should append chip input->enter when valid value entered', function() {
      const component = mountWithMuiTheme(<ChipInput dataSource={dataSource} />);
      const input = component.find('input');

      input.simulate('focus');
      input.simulate('change', { target: { value: 'some-' } });
      input.simulate('keyDown', { key: 'Enter', which: 13, keyCode: 13 });

      expect(component.state().selectedKeys).has.lengthOf(1);
      expect(component.state().selectedKeys[0]).to.equal('some-key');
    });

    it('should not append a chip input->enter when a non-valid value entered', function() {
      const component = mountWithMuiTheme(<ChipInput dataSource={dataSource} />);
      const input = component.find('input');

      input.simulate('focus');
      input.simulate('change', { target: { value: 'a' } });
      input.simulate('keyDown', { key: 'Enter', which: 13, keyCode: 13 });

      expect(component.state().selectedKeys).has.lengthOf(0);
    });

    it('should clear input when selection is made when controlled', function() {
      const component = mountWithMuiTheme(<ChipInput dataSource={dataSource} selectedKeys={[]} />);
      const input = component.find('input');

      input.simulate('focus');
      input.simulate('change', { target: { value: 's' } });
      input.simulate('keyDown', { key: 'Enter', which: 13, keyCode: 13 });

      expect(component.state().inputValue).to.equal('');
    });

    it('should clear input when selection is made when uncontrolled', function() {
      const component = mountWithMuiTheme(<ChipInput dataSource={dataSource} />);
      const input = component.find('input');

      input.simulate('focus');
      input.simulate('change', { target: { value: 's' } });
      input.simulate('keyDown', { key: 'Enter', which: 13, keyCode: 13 });

      expect(component.state().inputValue).to.equal('');
    });
  });

  describe('Event Handlers', function() {
    it('should trigger onRequestRemove when controlled', function() {
      const onRequestRemoveSpy = sinon.spy();
      const component = mountWithMuiTheme(
        <ChipInput
          dataSource={dataSource}
          selectedKeys={['some-key', 'some-key-2']}
          onRequestRemove={onRequestRemoveSpy}
        />
      );

      const firstChip = component.find('.ui-128--chip-input-chip').first();
      firstChip.simulate('keyDown', { key: 'Delete', which: 8, keyCode: 8 });

      expect(onRequestRemoveSpy.calledOnce).to.equal(true);
    });

    it('should trigger onRequestAdd when controlled', function() {
      const onRequestAddSpy = sinon.spy();
      const component = mountWithMuiTheme(
        <ChipInput dataSource={dataSource} selectedKeys={[]} onRequestAdd={onRequestAddSpy} />
      );
      const input = component.find('input');

      input.simulate('focus');
      input.simulate('change', { target: { value: 'some-' } });
      input.simulate('keyDown', { key: 'Enter', which: 13, keyCode: 13 });

      expect(onRequestAddSpy.calledOnce).to.equal(true);
    });

    it('should trigger onChange when uncontrolled', function() {
      const onChangeSpy = sinon.spy();
      const component = mountWithMuiTheme(<ChipInput dataSource={dataSource} onChange={onChangeSpy} />);
      const input = component.find('input');

      input.simulate('focus');
      input.simulate('change', { target: { value: 'some-' } });
      input.simulate('keyDown', { key: 'Enter', which: 13, keyCode: 13 });

      expect(onChangeSpy.calledOnce).to.equal(true);
    });

    it('should trigger onAdd when uncontrolled', function() {
      const onAddSpy = sinon.spy();
      const component = mountWithMuiTheme(<ChipInput dataSource={dataSource} onAdd={onAddSpy} />);
      const input = component.find('input');

      input.simulate('focus');
      input.simulate('change', { target: { value: 'some-' } });
      input.simulate('keyDown', { key: 'Enter', which: 13, keyCode: 13 });

      expect(onAddSpy.calledOnce).to.equal(true);
      expect(
        onAddSpy.calledWith(
          {
            key: 'some-key',
            label: 'some-label',
            value: 'some-value',
            originalDatum: {
              key: 'some-key',
              label: 'some-label',
              value: 'some-value',
              type: 'SOMETHING'
            }
          },
          'some-key'
        )
      ).to.equal(true);
    });

    it('should trigger onRemove when uncontrolled', function() {
      const onRemoveSpy = sinon.spy();
      const component = mountWithMuiTheme(
        <ChipInput dataSource={dataSource} defaultSelectedKeys={['some-key', 'some-key-2']} onRemove={onRemoveSpy} />
      );

      const firstChip = component.find('.ui-128--chip-input-chip').first();
      firstChip.simulate('keyDown', { key: 'Delete', which: 8, keyCode: 8 });

      expect(onRemoveSpy.calledOnce).to.equal(true);
      expect(
        onRemoveSpy.calledWith(
          {
            key: 'some-key',
            label: 'some-label',
            value: 'some-value',
            originalDatum: {
              key: 'some-key',
              label: 'some-label',
              value: 'some-value',
              type: 'SOMETHING'
            }
          },
          'some-key'
        )
      ).to.equal(true);
    });

    it('should not trigger onRequestRemove when uncontrolled', function() {
      const onRequestRemoveSpy = sinon.spy();
      const component = mountWithMuiTheme(
        <ChipInput
          dataSource={dataSource}
          defaultSelectedKeys={['some-key', 'some-key-2']}
          onRequestRemove={onRequestRemoveSpy}
        />
      );

      const firstChip = component.find('.ui-128--chip-input-chip').first();
      firstChip.simulate('keyDown', { key: 'Delete', which: 8, keyCode: 8 });

      expect(onRequestRemoveSpy.calledOnce).to.equal(false);
    });

    it('should not trigger onRequestAdd when uncontrolled', function() {
      const onRequestAddSpy = sinon.spy();
      const component = mountWithMuiTheme(
        <ChipInput dataSource={dataSource} defaultSelectedKeys={[]} onRequestAdd={onRequestAddSpy} />
      );
      const input = component.find('input');

      input.simulate('focus');
      input.simulate('change', { target: { value: 'some-' } });
      input.simulate('keyDown', { key: 'Enter', which: 13, keyCode: 13 });

      expect(onRequestAddSpy.calledOnce).to.equal(false);
    });

    it('should not trigger onChange when controlled', function() {
      const onChangeSpy = sinon.spy();
      const component = mountWithMuiTheme(
        <ChipInput dataSource={dataSource} selectedKeys={[]} onChange={onChangeSpy} />
      );
      const input = component.find('input');

      input.simulate('focus');
      input.simulate('change', { target: { value: 'some-' } });
      input.simulate('keyDown', { key: 'Enter', which: 13, keyCode: 13 });

      expect(onChangeSpy.calledOnce).to.equal(false);
    });

    it('should not trigger onAdd when controlled', function() {
      const onAddSpy = sinon.spy();
      const component = mountWithMuiTheme(<ChipInput dataSource={dataSource} selectedKeys={[]} onAdd={onAddSpy} />);
      const input = component.find('input');

      input.simulate('focus');
      input.simulate('change', { target: { value: 'some-' } });
      input.simulate('keyDown', { key: 'Enter', which: 13, keyCode: 13 });

      expect(onAddSpy.calledOnce).to.equal(false);
    });

    it('should not trigger onRemove when controlled', function() {
      const onRemoveSpy = sinon.spy();
      const component = mountWithMuiTheme(
        <ChipInput dataSource={dataSource} selectedKeys={['some-key', 'some-key-2']} onRemove={onRemoveSpy} />
      );

      const firstChip = component.find('.ui-128--chip-input-chip').first();
      firstChip.simulate('keyDown', { key: 'Delete', which: 8, keyCode: 8 });

      expect(onRemoveSpy.calledOnce).to.equal(false);
    });
  });

  describe('Presentation', function() {
    it('should render an an icon element', function() {
      const component = mountWithMuiTheme(<ChipInput dataSource={dataSource} icon={<div className="some-icon" />} />);
      const icon = component.find('.some-icon');

      expect(icon.exists()).to.equal(true);
    });

    it('should create menu groups when groupBy function is supplied', function() {
      const groupBy = obj => obj.originalDatum.type;
      const component = mountWithMuiTheme(<ChipInput dataSource={dataSource} groupBy={groupBy} />);

      component.find('input').simulate('focus');
      const subheaders = component.find(Subheader);

      expect(subheaders).to.have.lengthOf(2);
    });

    it('should show menu items that match search criteria ignoring case', function() {
      const component = mountWithMuiTheme(<ChipInput dataSource={dataSource} />);
      const input = component.find('input');

      input.simulate('focus');
      input.simulate('change', { target: { value: 'OtHeR' } });

      const menuItems = component.find(MenuItem).first();

      expect(menuItems.text()).to.equal('other');
    });

    it('should not have a placeholder when not empty', function() {
      const component = mountWithMuiTheme(<ChipInput dataSource={dataSource} placeholder="some placeholder!" />);
      const input = component.find('input');

      input.simulate('focus');
      input.simulate('change', { target: { value: 'some-' } });
      input.simulate('keyDown', { key: 'Enter', which: 13, keyCode: 13 });

      expect(input.props().placeholder).to.equal(null);
    });

    it('should not have a placeholder when not empty', function() {
      const component = mountWithMuiTheme(<ChipInput dataSource={dataSource} placeholder="some placeholder!" />);
      const input = component.find('input');

      expect(input.props().placeholder).to.equal('some placeholder!');
    });
  });
});
