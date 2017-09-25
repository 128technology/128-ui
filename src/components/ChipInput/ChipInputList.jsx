import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import ChipInputChip from './ChipInputChip';

class ChipInputList extends React.PureComponent {
  createChips() {
    const { onFocus, onBlur, onDelete, onKeyDown, focusedChipIndex, items, muiChipProps } = this.props;
    
    return _.map(items, (item, index) => (
      <ChipInputChip
        key={item.key || JSON.stringify(item)}
        label={item.label}
        value={item.value}
        chipIndex={index}
        focused={focusedChipIndex === index}
        onDelete={() => onDelete(item, index)}
        onKeyDown={onKeyDown}
        onFocus={() => onFocus(item, index)}
        onBlur={() => onBlur(item, index)}
        muiChipProps={muiChipProps}
      />
    ));
  }

  render() {
    return (
      <div className="ui-128 ui-128--chip-input-list">
        {this.createChips()}
      </div>
    );
  }
}

ChipInputList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.string,
      value: PropTypes.any
    })
  ),
  onDelete: PropTypes.func,
  onKeyDown: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  focusedChipIndex: PropTypes.number,
  muiChipProps: PropTypes.func
};

ChipInputList.defaultProps = {
  items: [],
  onDelete: _.noop,
  onBlur: _.noop,
  onKeyDown: _.noop,
  onFocus: _.noop,
  focusedChipIndex: null
};

export default ChipInputList;
