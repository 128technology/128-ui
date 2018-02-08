import React from 'react';
import PropTypes from 'prop-types';
import TetherComponent from 'react-tether';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';

class ChipInputMenu extends React.PureComponent {
  render() {
    const { muiMenuProps, children, ...rest } = this.props;

    return (
      <TetherComponent
        renderElementTo="body"
        attachment="top left"
        targetAttachment="top left"
        constraints={[
          {
            to: 'window',
            attachment: 'together',
            pin: ['top']
          }
        ]}
      >
        <div />
        <div {...rest} className="ui-128 ui-128--chip-input-dropdown">
          <Paper zDepth={1}>
            <Menu {...muiMenuProps(children)} disableAutoFocus={true}>
              {children}
            </Menu>
          </Paper>
        </div>
      </TetherComponent>
    );
  }
}

ChipInputMenu.propTypes = {
  muiMenuProps: PropTypes.func
};

ChipInputMenu.defaultProps = {
  muiMenuProps: () => ({})
};

export default ChipInputMenu;
