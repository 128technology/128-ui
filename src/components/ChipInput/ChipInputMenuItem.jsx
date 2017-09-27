import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from 'material-ui/MenuItem';

class ChipInputMenuItem extends React.PureComponent {
  render() {
    const { label, isHighlighted, ...rest } = this.props;

    return (
      <MenuItem
        primaryText={label}
        focusState="none"
        style={{
          backgroundColor: isHighlighted ? 'rgba(0, 0, 0, 0.1)' : 'transparent'
        }}
        {..._.omit(rest, 'datum')}
      />
    );
  }
}

ChipInputMenuItem.PropTypes = {
  datum: PropTypes.any,
  label: PropTypes.string,
  isHighlighted: PropTypes.bool
};

ChipInputMenuItem.defaultProps = {
  datum: {},
  label: '',
  isHighlighted: false
};

export default ChipInputMenuItem;
