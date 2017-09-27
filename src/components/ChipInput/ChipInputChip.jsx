import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';
import { blue300 } from 'material-ui/styles/colors';

import * as keyCodes from '../../utils/keyCodes';

class ChipInputChip extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    const { focused } = this.props;

    if (focused) {
      this.chipContainer.focus();      
    }
  }

  componentDidUpdate() {
    const { focused } = this.props;

    if (focused) {
      this.chipContainer.focus();
    }
  }

  handleKeyDown(e) {
    const { onKeyDown, onDelete } = this.props;
    const { which } = e;
  
    switch (which) {
      case keyCodes.BACKSPACE:
        e.preventDefault();
        onDelete();
    }

    if (_.isFunction(onKeyDown)) {
      onKeyDown(e);
    }
  }

  render() {
    const { label, value, onFocus, onBlur, onDelete, focused, muiChipProps } = this.props;

    return (
      <div
        ref={(el) => this.chipContainer = el}
        className="ui-128 ui-128--chip-input-chip"
        onKeyDown={this.handleKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        tabIndex="0"
      >
        <Chip
          backgroundColor={focused ? blue300 : null}
          onRequestDelete={onDelete}
          children={label}
          {...muiChipProps(label, value, focused)}
        />
      </div>
    );
  }
}

ChipInputChip.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onDelete: PropTypes.func,
  onKeyDown: PropTypes.func,
  focused: PropTypes.bool,
  muiChipProps: PropTypes.func
};


ChipInputChip.defaultProps = {
  label: '',
  value: null,
  onFocus: _.noop,
  onBlur: _.noop,
  onDelete: _.noop,
  focused: false,
  muiChipProps: () => ({})
};

export default ChipInputChip;
