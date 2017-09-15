import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactAutocomplete from 'react-autocomplete';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';

import './ChipInput.scss';

import ChipInputList from './ChipInputList';

const keyCodes = {
  BACKSPACE: 8,
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39,
  TAB: 9
};

class DropdownItem extends React.PureComponent {
  render() {
    const { isHighlighted, ...rest } = this.props;
    
    return (
      <MenuItem
        {...rest}
        focusState="none"
        style={{
          backgroundColor: isHighlighted ? 'rgba(0, 0, 0, 0.1)' : 'transparent'
        }}
      />
    );
  }
}

function renderItem(item, isHighlighted) {
  return (
    <DropdownItem
      primaryText={item.label}
      value={item}
      key={item.value}
      isHighlighted={isHighlighted}
    />
  );
}

function getItemValue(item) {
  return item.label;
}

function reconfigureDataSource(dataSourceConfig, dataSource) {
  return _.map(dataSource, (datum) => Object.assign({}, datum, {
    label: datum[dataSourceConfig.label],
    value: datum[dataSourceConfig.value]
  }));
}

function itemIsMatch(item, searchValue) {
  return item.label.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
}

function groupItems(items, groupBy) {
  const groupedItems = _.groupBy(items, (item) => groupBy(item.props.value));

  return _.flatMap(groupedItems, (group, groupName) => [
    <Subheader key={groupName} className="ui-128 ui-128--chip-input-dropdown-group">{groupName}</Subheader>,
    group
  ]);
}

class ChipInput extends React.PureComponent {
  constructor(props) {
    super(props);
    const { dataSource, dataSourceConfig } = props;    

    const reconfiguredDataSource = reconfigureDataSource(dataSourceConfig, dataSource);

    this.state = {
      inputValue: '',
      dataSource: reconfiguredDataSource,
      origDataSource: reconfiguredDataSource,
      selectedValues: [],
      focusedChipIndex: null,
      inputFocused: false
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSelect = this.handleOnSelect.bind(this);
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
    this.handleOnFocus = this.handleOnFocus.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.handleOnChipDelete = this.handleOnChipDelete.bind(this);
    this.handleOnChipKeyDown = this.handleOnChipKeyDown.bind(this);
    this.handleOnChipFocus = this.handleOnChipFocus.bind(this);
    this.renderMenu = this.renderMenu.bind(this);
  }

  renderMenu(items, value) {
    const { groupBy } = this.props;
    const menuItems = _.isFunction(groupBy) ? groupItems(items, groupBy) : items;

    if (!menuItems.length) {
      return <div />;
    }

    return (
      <div className="ui-128 ui-128--chip-input-dropdown">
        <Paper zDepth={1}>
          <Menu disableAutoFocus={true}>
            {menuItems}
          </Menu>
        </Paper>
      </div>
    );
  }

  handleOnSelect(value, item) {
    this.setState((prevState) => {
      const selectedValues = _.concat(prevState.selectedValues, item);

      return {
        inputValue: '',
        selectedValues,
        dataSource: _.difference(prevState.origDataSource, selectedValues)
      };
    });
  }

  handleOnKeyDown(e) {
    const { selectedValues } = this.state;
    const { target: { value }, which } = e;
    const lastValueIndex = selectedValues.length - 1;

    switch (which) {
      case keyCodes.BACKSPACE:
        if (value === '' && selectedValues.length > 0) {
          this.removeValue(lastValueIndex);
        }
        break;
      case keyCodes.LEFT_ARROW:
        if (value === '' && selectedValues.length > 0) {
          this.focusChip(lastValueIndex);
        }
        break;
    }
  }

  handleOnFocus() {
    this.setState({ focusedChipIndex: null, inputFocused: true });
  }

  handleOnChipDelete(item, index) {
    this.removeValue(index);
  }

  focusChip(focusedChipIndex) {
    this.setState({ focusedChipIndex, inputFocused: false });
  }

  removeValue(index) {
    this.setState((prevState) => {
      const selectedValues = prevState.selectedValues.slice();
      selectedValues.splice(index, 1);
      const lastValueIndex = selectedValues.length - 1;
      
      const clamp = (val) => val !== null && lastValueIndex > -1
        ? _.clamp(val, 0, lastValueIndex)
        : null;

      const focusedChipIndex = clamp(prevState.focusedChipIndex);

      if (focusedChipIndex === null) {
        this.autoCompleteInput.focus();
      } 

      return {
        inputValue: '',
        selectedValues,
        dataSource: _.difference(prevState.origDataSource, selectedValues),
        focusedChipIndex
      };
    });
  }

  handleOnChipKeyDown(e) {
    const { which } = e;
    const { focusedChipIndex, selectedValues } = this.state;
    const lastValueIndex = selectedValues.length - 1;
    const clamp = (val) => _.clamp(val, 0, lastValueIndex);

    switch (which) {
      case keyCodes.RIGHT_ARROW:
        if (focusedChipIndex === lastValueIndex) {
          this.autoCompleteInput.focus();
        } else {
          this.focusChip(clamp(focusedChipIndex + 1));          
        }
        break;
      case keyCodes.LEFT_ARROW:
        this.focusChip(clamp(focusedChipIndex - 1));
        break;
      case keyCodes.TAB:
        if (e.shiftKey && focusedChipIndex > 0) {
          e.preventDefault();
          this.focusChip(clamp(focusedChipIndex - 1));
        } else if (e.shiftKey && focusedChipIndex === 0) {
          this.focusChip(null);
        } else if (!e.shiftKey && focusedChipIndex < lastValueIndex) {
          e.preventDefault();
          this.focusChip(clamp(focusedChipIndex + 1));
        } else if (!e.shiftKey && focusedChipIndex === lastValueIndex) {
          e.preventDefault();
          this.autoCompleteInput.focus();
        }
    }
  }

  handleOnBlur() {
    this.setState({ inputFocused: false });
  }

  handleOnChipFocus(item, index) {
    this.focusChip(index);
  }
  
  handleOnChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  render() {
    const { inputValue, selectedValues, dataSource, focusedChipIndex, inputFocused } = this.state;
    const showUnderline = inputFocused || focusedChipIndex !== null;

    const className = classNames({
      'ui-128': true,
      'ui-128--chip-input': true,
      'ui-128--chip-input_underlined': showUnderline
    });

    return (
      <div className={className}>
        <ChipInputList
          items={selectedValues}
          onDelete={this.handleOnChipDelete}
          onKeyDown={this.handleOnChipKeyDown}
          onFocus={this.handleOnChipFocus}
          focusedChipIndex={focusedChipIndex}
        />
        <ReactAutocomplete
          ref={(el) => this.autoCompleteInput = el}
          getItemValue={getItemValue}
          items={dataSource}
          shouldItemRender={itemIsMatch}
          renderItem={renderItem}
          renderMenu={this.renderMenu}
          value={inputValue}
          onChange={this.handleOnChange}
          onSelect={this.handleOnSelect}
          wrapperProps={{
            className: 'ui-128 ui-128--chip-input-autocomplete',
            style: {}
          }}
          inputProps={{
            onKeyDown: this.handleOnKeyDown,
            onFocus: this.handleOnFocus,
            onBlur: this.handleOnBlur
          }}
        />
      </div>
    );
  }
}

ChipInput.propTypes = {
  dataSource: PropTypes.array.isRequired,
  dataSourceConfig: PropTypes.object.isRequired,
  groupBy: PropTypes.func
};

ChipInput.defaultProps = {
  dataSource: [],
  dataSourceConfig: {
    label: 'label',
    value: 'value'
  },
  groupBy: _.noop
};

export default ChipInput;
