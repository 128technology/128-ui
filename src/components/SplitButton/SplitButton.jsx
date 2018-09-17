import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

class SplitButton extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { open: false };

    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleDropdownClick = this.handleDropdownClick.bind(this);
  }

  handleDropdownClick(e) {
    e.preventDefault();
    this.setState({ open: true, anchorEl: e.currentTarget });
  }

  handleRequestClose() {
    this.setState({ open: false });
  }

  render() {
    const {
      classes,
      variant,
      disabled,
      dropdownDisabled,
      popoverContent,
      closePopoverOnClick,
      defaultOnClick,
      children,
      color,
      dropdownIconClassName
    } = this.props;

    const { open, anchorEl } = this.state;

    return (
      <Paper elevation={variant === 'raised' ? 1 : 0} className={classes.container}>
        <div className={classes.buttonContainer}>
          <Button
            variant="flat"
            color={color}
            disabled={disabled}
            onClick={defaultOnClick}
            className={classes.baseButton}
          >
            {children}
          </Button>
          <Button
            color={color}
            variant="flat"
            disabled={disabled || dropdownDisabled}
            onClick={this.handleDropdownClick}
            className={classes.dropdownButton}
          >
            <i className={classNames(dropdownIconClassName, classes.icon)} />
          </Button>
        </div>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleRequestClose}
          onClick={this.handleRequestClose}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <div onClick={closePopoverOnClick ? this.handleRequestClose : undefined}>{popoverContent}</div>
        </Popover>
      </Paper>
    );
  }
}

SplitButton.propTypes = {
  variant: PropTypes.oneOf(['flat', 'raised']),
  color: PropTypes.string,
  popoverContent: PropTypes.node,
  defaultOnClick: PropTypes.func,
  children: PropTypes.node,
  dropdownIconClassName: PropTypes.string,
  disabled: PropTypes.bool,
  dropdownDisabled: PropTypes.bool,
  closePopoverOnClick: PropTypes.bool
};

SplitButton.defaultProps = {
  variant: 'flat',
  color: 'default',
  defaultOnClick: () => {},
  dropdownIconClassName: 'mdi mdi-menu-down',
  disabled: false,
  dropdownDisabled: false,
  closePopoverOnClick: false
};

const enhance = withStyles(({ palette }) => ({
  container: {
    display: 'inline-block'
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  dropdownButton: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    paddingLeft: 0,
    paddingRight: 0,
    minWidth: 40,
    borderLeft: `solid 1px ${palette.grey['300']}`
  },
  baseButton: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  icon: {
    fontSize: 16
  }
}));

export default enhance(SplitButton);
