import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from 'material-ui/MenuItem';

class ChipInputMenuItem extends React.PureComponent {
  render() {
    const { label, isHighlighted, style, ...rest } = this.props;

    return (
      <MenuItem
        {..._.omit(rest, 'datum')}
        primaryText={label}
        focusState="none"
        className="ui-128 ui-128--chip-input-menu-item"
        style={Object.assign(
          {
            backgroundColor: isHighlighted ? 'rgba(0, 0, 0, 0.1)' : 'transparent'
          },
          style
        )}
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
