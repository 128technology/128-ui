import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import Subheader from 'material-ui/Subheader';

import './ChipInput.scss';
import ChipInputList from './ChipInputList';
import ChipInputMenuItem from './ChipInputMenuItem';
import ChipInputAutocomplete from './ChipInputAutocomplete';
import * as keyCodes from '../../utils/keyCodes';
import { getClosestKey, formatDataSource, differenceByKeys, filterByKeys } from './utils/chipInputUtils';

function getItemValue({ label }) {
  return label;
}

function itemIsMatch({ label }, searchValue) {
  return label.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
}

function mapGroupDatums(group) {
  return _.map(group, 'props.datum');
}

function groupItems(items, groupBy, menuHeadingProps) {
  const groupedItems = _.groupBy(items, item => groupBy(item.props.datum));
  const headingProps = _.isFunction(menuHeadingProps) ? menuHeadingProps : _.noop;

  return _.flatMap(groupedItems, (group, groupName) => [
    <Subheader
      {...headingProps(groupName, mapGroupDatums(group))}
      key={groupName}
      className="ui-128 ui-128--chip-input-dropdown-group"
    >
      {groupName}
    </Subheader>,
    group
  ]);
}

class ChipInput extends React.PureComponent {
  constructor(props) {
    super(props);
    const { dataSource, dataSourceConfig } = props;
    const selectedKeys = props.selectedKeys || props.defaultSelectedKeys;
    const dataSourceMap = _.keyBy(formatDataSource(dataSource, dataSourceConfig), 'key');

    this.state = {
      inputValue: '',
      dataSourceMap,
      selectedKeys,
      focusedChipKey: null,
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
    this.handleOnContainerClick = this.handleOnContainerClick.bind(this);
    this.renderAutocompleteMenu = this.renderAutocompleteMenu.bind(this);
    this.renderAutocompleteItem = this.renderAutocompleteItem.bind(this);
    this.triggerOnChange = this.triggerOnChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const oldProps = this.props;

    if (
      !_.isEqual(oldProps.dataSource, nextProps.dataSource) ||
      !_.isEqual(oldProps.dataSourceConfig, nextProps.dataSourceConfig)
    ) {
      this.updateDataSource(nextProps);
    }
  }

  updateDataSource(nextProps) {
    const { dataSource, dataSourceConfig } = nextProps;
    const selectedKeys = nextProps.selectedKeys || nextProps.defaultSelectedKeys;
    const dataSourceMap = _.keyBy(formatDataSource(dataSource, dataSourceConfig), 'key');

    this.setState({
      selectedKeys,
      dataSourceMap
    });
  }

  renderAutocompleteMenu(items, value) {
    const { groupBy, menuHeadingProps } = this.props;
    const menuItems = _.isFunction(groupBy) ? groupItems(items, groupBy, menuHeadingProps) : items;

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

  renderAutocompleteItem(item, isHighlighted) {
    const { menuItemProps } = this.props;
    const menuProps = _.isFunction(menuItemProps) ? menuItemProps : _.noop;

    return (
      <ChipInputMenuItem
        {...menuProps(item.label, item, isHighlighted)}
        key={item.key}
        label={item.label}
        datum={item}
        isHighlighted={isHighlighted}
      />
    );
  }

  clearAutocompleteInput() {
    this.setState({
      inputValue: ''
    });
  }

  addValue(value, item) {
    const { selectedKeys } = this.props;

    if (selectedKeys) {
      this.triggerOnRequestAdd(item, item.key);
    } else {
      this.setState(
        prevState => {
          const newSelectedKeys = _.concat(prevState.selectedKeys, item.key);

          return {
            selectedKeys: newSelectedKeys
          };
        },
        () => {
          this.triggerOnChange();
          this.triggerOnAdd(item, item.key);
        }
      );
    }
  }

  removeValue(key, triggeredByClick) {
    const { selectedKeys } = this.props;
    const item = this.getChipValue(key);

    if (selectedKeys) {
      this.triggerOnRequestRemove(item, item.key, triggeredByClick);
    } else {
      this.setState(
        prevState => {
          const newSelectedKeys = _.filter(prevState.selectedKeys, selectedKey => selectedKey !== key);
          const closestKey =
            triggeredByClick || prevState.inputFocused
              ? null
              : getClosestKey(newSelectedKeys, prevState.selectedKeys, prevState.focusedChipKey);

          return {
            selectedKeys: newSelectedKeys,
            focusedChipKey: closestKey,
            inputFocused: closestKey === null
          };
        },
        () => {
          this.triggerOnChange();
          this.triggerOnRemove(item, key);
        }
      );
    }
  }

  triggerOnRequestAdd(item, key) {
    const { onRequestAdd } = this.props;

    if (_.isFunction(onRequestAdd)) {
      onRequestAdd(item, key);
    }
  }

  triggerOnRequestRemove(item, key, triggeredByClick) {
    const { onRequestRemove } = this.props;

    if (_.isFunction(onRequestRemove)) {
      const prevProps = this.props;
      const prevState = this.state;

      const focusClosest = () => {
        const { selectedKeys } = this.props;
        const closestKey =
          triggeredByClick || prevState.inputFocused
            ? null
            : getClosestKey(selectedKeys, prevProps.selectedKeys, prevState.focusedChipKey);

        if (closestKey !== null) {
          this.focusChip(closestKey);
        } else {
          this.focusAutocompleteInput();
        }
      };

      onRequestRemove(item, key, focusClosest);
    }
  }

  triggerOnChange() {
    const { onChange } = this.props;
    const { selectedKeys, dataSourceMap } = this.state;
    const selectedValues = filterByKeys(dataSourceMap, selectedKeys);

    if (_.isFunction(onChange)) {
      onChange(selectedValues);
    }
  }

  triggerOnAdd(item, key) {
    const { onAdd } = this.props;

    if (_.isFunction(onAdd)) {
      onAdd(item, key);
    }
  }

  triggerOnRemove(item, key) {
    const { onRemove } = this.props;

    if (_.isFunction(onRemove)) {
      onRemove(item, key);
    }
  }

  getChipValue(key) {
    const { dataSourceMap } = this.state;
    return dataSourceMap[key];
  }

  getSelectedKeys() {
    return this.props.selectedKeys || this.state.selectedKeys;
  }

  getAutocompleteItems() {
    const { dataSourceMap } = this.state;
    const { groupBy } = this.props;
    const selectedKeys = this.getSelectedKeys();
    const autocompleteItems = differenceByKeys(dataSourceMap, selectedKeys);

    return _.isFunction(groupBy) ? _.orderBy(autocompleteItems, groupBy) : autocompleteItems;
  }

  handleOnInputBlur() {
    this.setState({ inputFocused: false });
  }

  handleOnAutocompleteChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  handleOnAutocompleteSelect(value, item) {
    this.addValue(value, item);
    this.clearAutocompleteInput();
  }

  handleOnInputKeyDown(e) {
    const selectedKeys = this.getSelectedKeys();
    const { target: { value }, which } = e;
    const lastValueKey = _.last(selectedKeys);

    switch (which) {
      case keyCodes.BACKSPACE:
        if (value === '' && selectedKeys.length > 0) {
          this.removeValue(lastValueKey);
        }
        break;
      case keyCodes.LEFT_ARROW:
        if (value === '' && selectedKeys.length > 0) {
          this.focusPrev();
        }
    }
  }

  handleOnInputFocus() {
    this.setState({ focusedChipKey: null, inputFocused: true });
  }

  handleOnChipFocus(item, key, e) {
    this.focusChip(key);
  }

  handleOnChipBlur() {
    this.focusChip(null);
  }

  handleOnChipDelete(item, key, e) {
    const triggeredByClick = e.type === 'mouseup';
    this.removeValue(key, triggeredByClick);
  }

  handleOnChipKeyDown(item, key, e) {
    const { which } = e;
    const selectedKeys = this.getSelectedKeys();

    switch (which) {
      case keyCodes.RIGHT_ARROW:
        this.focusNext();
        break;
      case keyCodes.LEFT_ARROW:
        this.focusPrev();
        break;
      case keyCodes.TAB:
        if (e.shiftKey && _.first(selectedKeys) !== key) {
          e.preventDefault();
          this.focusPrev();
        } else if (!e.shiftKey) {
          e.preventDefault();
          this.focusNext();
        }
    }
  }

  handleOnContainerClick(e) {
    if (e.currentTarget === e.target) {
      this.focusAutocompleteInput();
    }
  }

  focusNext() {
    const selectedKeys = this.getSelectedKeys();
    const { focusedChipKey } = this.state;

    if (_.last(selectedKeys) === focusedChipKey) {
      this.focusAutocompleteInput();
    } else if (selectedKeys.indexOf(focusedChipKey) > -1) {
      const nextKey = _.nth(selectedKeys, selectedKeys.indexOf(focusedChipKey) + 1);
      this.focusChip(nextKey);
    }
  }

  focusPrev() {
    const selectedKeys = this.getSelectedKeys();
    const { focusedChipKey } = this.state;

    if (focusedChipKey !== null && _.first(selectedKeys) !== focusedChipKey) {
      const prevKey = _.nth(selectedKeys, selectedKeys.indexOf(focusedChipKey) - 1);
      this.focusChip(prevKey);
    } else if (focusedChipKey === null && selectedKeys.length > 0) {
      this.focusChip(_.last(selectedKeys));
    }
  }

  focusChip(focusedChipKey) {
    this.setState({ focusedChipKey, inputFocused: false });
  }

  focusAutocompleteInput() {
    this.setState({
      inputFocused: true,
      focusedChipKey: null
    });
  }

  isEmpty() {
    const selectedKeys = this.props.selectedKeys || this.state.selectedKeys;
    return selectedKeys.length === 0;
  }

  render() {
    const { errorText, muiChipProps, className, icon, placeholder } = this.props;
    const { inputValue, focusedChipKey, inputFocused, dataSourceMap } = this.state;
    const selectedKeys = this.getSelectedKeys();
    const selectedValues = filterByKeys(dataSourceMap, selectedKeys);
    const autocompleteItems = this.getAutocompleteItems();
    const showUnderline = inputFocused || focusedChipKey !== null;

    const newClassName = classNames({
      'ui-128': true,
      'ui-128--chip-input': true,
      'ui-128--chip-input_underlined': showUnderline,
      'ui-128--chip-input_error': !_.isNil(errorText),
      [className]: _.isString(className)
    });

    return (
      <div className={newClassName}>
        <div className="ui-128 ui-128--chip-input-inner" onClick={this.handleOnContainerClick}>
          {icon && <div className="ui-128 ui-128--chip-input-icon">{icon}</div>}
          <ChipInputList
            items={selectedValues}
            onDelete={this.handleOnChipDelete}
            onKeyDown={this.handleOnChipKeyDown}
            onFocus={this.handleOnChipFocus}
            onBlur={this.handleOnChipBlur}
            muiChipProps={muiChipProps}
            focusedChipKey={focusedChipKey}
          />
          <ChipInputAutocomplete
            inputFocused={inputFocused}
            getItemValue={getItemValue}
            items={autocompleteItems}
            shouldItemRender={itemIsMatch}
            renderItem={this.renderAutocompleteItem}
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
              onBlur: this.handleOnInputBlur,
              placeholder: this.isEmpty() ? placeholder : null,
              size: 1 // overrides the default of 20, allows the input to avoid line breaking until actually necessary
            }}
          />
        </div>
        {errorText && <div className="ui-128--chip-input-errorText">{errorText}</div>}
      </div>
    );
  }
}

ChipInput.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataSourceConfig: PropTypes.object.isRequired,
  errorText: PropTypes.string,
  groupBy: PropTypes.func,
  muiChipProps: PropTypes.func,
  icon: PropTypes.node,
  onChange: PropTypes.func,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  onRequestRemove: PropTypes.func,
  onRequestAdd: PropTypes.func,
  selectedKeys: PropTypes.array,
  defaultSelectedKeys: PropTypes.array,
  placeholder: PropTypes.string,
  menuItemProps: PropTypes.func,
  menuHeadingProps: PropTypes.func
};

ChipInput.defaultProps = {
  dataSource: [],
  dataSourceConfig: {
    key: 'key',
    label: 'label',
    value: 'value'
  },
  defaultSelectedKeys: []
};

export default ChipInput;
