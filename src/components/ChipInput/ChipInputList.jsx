import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import ChipInputChip from './ChipInputChip';

class ChipInputList extends React.PureComponent {
  createChips() {
    const { onFocus, onDelete, onKeyDown, focusedChipIndex, items } = this.props;
    
    return items.map((item, index) => (
      <ChipInputChip
        key={item.value}
        label={item.label}
        chipIndex={index}
        focused={focusedChipIndex === index}
        onDelete={() => onDelete(item, index)}
        onKeyDown={onKeyDown}
        onFocus={() => onFocus(item, index)}
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
  items: PropTypes.array,
  onDelete: PropTypes.func,
  focusedChipIndex: PropTypes.number
};

ChipInputList.defaultProps = {
  items: [],
  onDelete: _.noop
};

export default ChipInputList;
