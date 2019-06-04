import * as React from 'react';
import * as classNames from 'classnames';
import Button, { ButtonProps } from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';

const styles = ({ palette, shape }: Theme) =>
  createStyles({
    container: {
      display: 'inline-block',
      borderRadius: shape.borderRadius,
      backgroundColor: '#fff'
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
      borderLeft: '1px solid #f2f2f2'
    },
    baseButton: {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      fontSize: 13
    },
    icon: {
      fontSize: 16
    },
    flat: {
      border: `1px solid ${palette.grey['300']}`
    },
    raised: {
      boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.18)'
    }
  });

export interface IProps extends WithStyles<typeof styles> {
  variant: 'contained' | 'raised' | 'text';
  color: ButtonProps['color'];
  defaultOnClick?: () => void;
  dropdownIconClassName?: string;
  disabled?: boolean;
  dropdownDisabled?: boolean;
  popoverContent?: React.ReactNode;
  closePopoverOnClick?: boolean;
}

interface IState {
  open: boolean;
  anchorEl?: HTMLElement | null | undefined;
}

export class SplitButton extends React.PureComponent<IProps, IState> {
  public readonly state: Readonly<IState> = {
    open: false
  };

  public render() {
    const {
      classes,
      variant = 'raised',
      disabled,
      dropdownDisabled,
      popoverContent,
      closePopoverOnClick,
      defaultOnClick = () => {},
      children,
      color = 'default',
      dropdownIconClassName = 'mdi mdi-menu-down'
    } = this.props;

    const { open, anchorEl } = this.state;

    return (
      <div
        className={classNames(
          classes.container,
          variant === 'text' && classes.flat,
          variant === 'raised' && classes.raised
        )}
      >
        <div className={classes.buttonContainer}>
          <Button
            variant="text"
            color={color}
            disabled={disabled}
            onClick={defaultOnClick}
            className={classes.baseButton}
          >
            {children}
          </Button>
          <Button
            color={color}
            variant="text"
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
      </div>
    );
  }

  private handleDropdownClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    this.setState({ open: true, anchorEl: e.currentTarget });
  };

  private handleRequestClose = () => this.setState({ open: false });
}

export default withStyles(styles)(SplitButton);
