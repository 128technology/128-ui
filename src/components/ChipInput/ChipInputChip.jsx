import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';
import { blue300 } from 'material-ui/styles/colors';

class ChipInputChip extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    const { focused } = this.props;

    if (focused) {
      this.button.focus();      
    }
  }

  componentDidUpdate() {
    const { focused } = this.props;

    if (focused) {
      this.button.focus();
    }
  }

  handleKeyDown(e) {
    const { onKeyDown, onDelete } = this.props;
    const { which } = e;
  
    const keyCodes = {
      BACKSPACE: 8,
      TAB: 9
    };
  
    switch (which) {
      case keyCodes.BACKSPACE:
        onDelete();
    }

    if (_.isFunction(onKeyDown)) {
      onKeyDown(e);
    }
  }

  render() {
    const { label, onFocus, onDelete, focused } = this.props;

    return (
      <button
        ref={(el) => this.button = el}
        className="ui-128 ui-128--chip-input-chip"
        onKeyDown={this.handleKeyDown}
        onFocus={onFocus}
      >
        <Chip
          backgroundColor={focused ? blue300 : null}
          onRequestDelete={() => onDelete()}
        >
          {label}
        </Chip>
      </button>
    );
  }
}

export default ChipInputChip;
