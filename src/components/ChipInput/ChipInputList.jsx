import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import ChipInputChip from './ChipInputChip';

class ChipInputList extends React.PureComponent {
  createChips() {
    const { onFocus, onBlur, onDelete, onKeyDown, focusedChipKey, items, muiChipProps } = this.props;

    return _.map(items, item => (
      <ChipInputChip
        key={item.key || JSON.stringify(item)}
        label={item.label}
        value={item.value}
        chipIndex={item.key}
        focused={focusedChipKey === item.key}
        onDelete={_.partial(onDelete, item, item.key)}
        onKeyDown={_.partial(onKeyDown, item, item.key)}
        onFocus={_.partial(onFocus, item, item.key)}
        onBlur={_.partial(onBlur, item, item.key)}
        muiChipProps={muiChipProps}
      />
    ));
  }

  render() {
    return <div className="ui-128 ui-128--chip-input-list">{this.createChips()}</div>;
  }
}

ChipInputList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.string,
      value: PropTypes.any
    })
  ).isRequired,
  onDelete: PropTypes.func,
  onKeyDown: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  focusedChipKey: PropTypes.string,
  muiChipProps: PropTypes.func
};

ChipInputList.defaultProps = {
  items: [],
  onDelete: _.noop,
  onBlur: _.noop,
  onKeyDown: _.noop,
  onFocus: _.noop,
  focusedChipKey: null
};

export default ChipInputList;
