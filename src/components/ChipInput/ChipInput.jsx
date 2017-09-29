import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ReactAutocomplete from 'react-autocomplete';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import Subheader from 'material-ui/Subheader';

import './ChipInput.scss';
import ChipInputList from './ChipInputList';
import ChipInputMenuItem from './ChipInputMenuItem';
import * as keyCodes from '../../utils/keyCodes';

function renderAutocompleteItem(item, isHighlighted) {
  return <ChipInputMenuItem key={item.key} label={item.label} datum={item} isHighlighted={isHighlighted} />;
}

function getItemValue({ label }) {
  return label;
}

function itemIsMatch({ label }, searchValue) {
  return label.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
}

function groupItems(items, groupBy) {
  const groupedItems = _.groupBy(items, item => groupBy(item.props.datum));

  return _.flatMap(groupedItems, (group, groupName) => [
    <Subheader key={groupName} className="ui-128 ui-128--chip-input-dropdown-group">
      {groupName}
    </Subheader>,
    group
  ]);
}

export function removeValueAtIndex(array, index) {
  if (index > array.length - 1 || index < 0) {
    return array.slice();
  }
  const front = array.slice(0, index);
  const back = array.slice(index + 1, array.length);
  return front.concat(back);
}

function differenceByKey(arrayA, arrayB) {
  return _.differenceWith(arrayA, arrayB, (a, b) => a.key === b.key);
}

class ChipInput extends React.PureComponent {
  constructor(props) {
    super(props);
    const { dataSource, dataSourceConfig, selectedKeys } = props;

    const reconfiguredDataSource = _.map(dataSource, datum => ({
      key: _.get(datum, dataSourceConfig.key, JSON.stringify(datum)),
      label: _.get(datum, dataSourceConfig.label, ''),
      value: _.get(datum, dataSourceConfig.value, null),
      originalDatum: datum
    }));

    const selectedValues =
      selectedKeys.length > 0 ? _.filter(reconfiguredDataSource, datum => selectedKeys.indexOf(datum.key) !== -1) : [];

    this.state = {
      inputValue: '',
      dataSource: differenceByKey(reconfiguredDataSource, selectedValues),
      origDataSource: reconfiguredDataSource,
      selectedValues,
      focusedChipIndex: null,
      inputFocused: false
    };

    this.handleOnAutocompleteChange = this.handleOnAutocompleteChange.bind(this);
    this.handleOnAutocompleteSelect = this.handleOnAutocompleteSelect.bind(this);
    this.handleOnInputKeyDown = this.handleOnInputKeyDown.bind(this);
    this.handleOnInputFocus = this.handleOnInputFocus.bind(this);
    this.handleOnInputBlur = this.handleOnInputBlur.bind(this);
    this.handleOnChipDelete = this.handleOnChipDelete.bind(this);
    this.handleOnChipKeyDown = this.handleOnChipKeyDown.bind(this);
    this.handleOnChipFocus = this.handleOnChipFocus.bind(this);
    this.handleOnChipBlur = this.handleOnChipBlur.bind(this);
    this.renderAutocompleteMenu = this.renderAutocompleteMenu.bind(this);
    this.triggerOnChange = this.triggerOnChange.bind(this);
  }

  renderAutocompleteMenu(items, value) {
    const { groupBy } = this.props;
    const menuItems = _.isFunction(groupBy) ? groupItems(items, groupBy) : items;

    if (!menuItems.length) {
      return <div />;
    }

    return (
      <div className="ui-128 ui-128--chip-input-dropdown">
        <Paper zDepth={1}>
          <Menu disableAutoFocus={true}>{menuItems}</Menu>
        </Paper>
      </div>
    );
  }

  addValue(value, item) {
    this.setState(({ selectedValues, origDataSource }) => {
      const newSelectedValues = _.concat(selectedValues, item);

      return {
        inputValue: '',
        selectedValues: newSelectedValues,
        dataSource: differenceByKey(origDataSource, newSelectedValues)
      };
    }, this.triggerOnChange);
  }

  removeValue(index) {
    this.setState(
      ({ origDataSource, focusedChipIndex, selectedValues }) => {
        const newSelectedValues = removeValueAtIndex(selectedValues, index);
        const lastValueIndex = newSelectedValues.length - 1;

        const clamp = val => (val !== null && lastValueIndex > -1 ? _.clamp(val, 0, lastValueIndex) : null);

        return {
          inputValue: '',
          selectedValues: newSelectedValues,
          dataSource: differenceByKey(origDataSource, newSelectedValues),
          focusedChipIndex: clamp(focusedChipIndex)
        };
      },
      () => {
        const { focusedChipIndex } = this.state;

        if (focusedChipIndex === null) {
          this.focusAutocompleteInput();
        }

        this.triggerOnChange();
      }
    );
  }

  triggerOnChange() {
    const { onChange } = this.props;
    const { selectedValues } = this.state;

    if (_.isFunction(onChange)) {
      onChange(selectedValues);
    }
  }

  focusChip(focusedChipIndex) {
    this.setState({ focusedChipIndex, inputFocused: false });
  }

  focusAutocompleteInput() {
    this.autoCompleteInput.focus();
    this.handleOnInputFocus();
  }

  handleOnInputBlur() {
    this.setState({ inputFocused: false });
  }

  handleOnAutocompleteChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  handleOnAutocompleteSelect(value, item) {
    this.addValue(value, item);
  }

  handleOnInputKeyDown(e) {
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
    }
  }

  handleOnInputFocus() {
    this.setState({ focusedChipIndex: null, inputFocused: true });
  }

  handleOnChipFocus(item, index) {
    this.focusChip(index);
  }

  handleOnChipBlur() {
    this.focusChip(null);
  }

  handleOnChipDelete(item, index) {
    this.removeValue(index);
  }

  handleOnChipKeyDown(item, index, e) {
    const { which } = e;
    const { focusedChipIndex, selectedValues } = this.state;
    const lastValueIndex = selectedValues.length - 1;
    const clamp = val => _.clamp(val, 0, lastValueIndex);

    switch (which) {
      case keyCodes.RIGHT_ARROW:
        if (focusedChipIndex === lastValueIndex) {
          this.focusAutocompleteInput();
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
          this.focusAutocompleteInput();
        }
    }
  }

  render() {
    const { muiChipProps, className, icon } = this.props;
    const { inputValue, selectedValues, dataSource, focusedChipIndex, inputFocused } = this.state;
    const showUnderline = inputFocused || focusedChipIndex !== null;

    const newClassName = classNames({
      'ui-128': true,
      'ui-128--chip-input': true,
      'ui-128--chip-input_underlined': showUnderline,
      [className]: _.isString(className)
    });

    return (
      <div className={newClassName}>
        <div className="ui-128 ui-128--chip-input-icon">{icon}</div>
        <ChipInputList
          items={selectedValues}
          onDelete={this.handleOnChipDelete}
          onKeyDown={this.handleOnChipKeyDown}
          onFocus={this.handleOnChipFocus}
          onBlur={this.handleOnChipBlur}
          muiChipProps={muiChipProps}
          focusedChipIndex={focusedChipIndex}
        />
        <ReactAutocomplete
          ref={el => (this.autoCompleteInput = el)}
          getItemValue={getItemValue}
          items={dataSource}
          shouldItemRender={itemIsMatch}
          renderItem={renderAutocompleteItem}
          renderMenu={this.renderAutocompleteMenu}
          value={inputValue}
          onChange={this.handleOnAutocompleteChange}
          onSelect={this.handleOnAutocompleteSelect}
          wrapperProps={{
            className: 'ui-128 ui-128--chip-input-autocomplete',
            style: {}
          }}
          inputProps={{
            onKeyDown: this.handleOnInputKeyDown,
            onFocus: this.handleOnInputFocus,
            onBlur: this.handleOnInputBlur
          }}
        />
      </div>
    );
  }
}

ChipInput.propTypes = {
  dataSource: PropTypes.array.isRequired,
  dataSourceConfig: PropTypes.object.isRequired,
  groupBy: PropTypes.func,
  onChange: PropTypes.func,
  selectedKeys: PropTypes.array,
  muiChipProps: PropTypes.func,
  icon: PropTypes.node
};

ChipInput.defaultProps = {
  dataSource: [],
  selectedKeys: [],
  dataSourceConfig: {
    key: 'key',
    label: 'label',
    value: 'value'
  },
  groupBy: null,
  icon: null
};

export default ChipInput;
