import * as React from 'react';
import * as moment from 'moment';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { withStyles, Theme, WithStyles, createStyles } from '@material-ui/core/styles';

const styles = ({ palette }: Theme) =>
  createStyles({
    listButton: {
      display: 'flex',
      justifyContent: 'center',
      color: palette.text.primary
    }
  });

interface IProps extends WithStyles<typeof styles> {
  date: moment.Moment;
  innerRef?: React.Ref<any>;
  selected?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>, date: moment.Moment) => void;
}

class PickerListItem extends React.Component<IProps> {
  handleOnClick = (e: React.MouseEvent<HTMLElement>) => {
    const { onClick, date } = this.props;

    if (onClick) {
      onClick(e, date);
    }
  };

  getColor = () => {
    const { disabled, selected } = this.props;

    if (disabled) {
      return 'inherit';
    }

    if (selected) {
      return 'primary';
    }

    return 'textPrimary';
  };

  render() {
    const { selected, disabled, children, classes, innerRef } = this.props;

    return (
      <ListItem
        buttonRef={innerRef}
        className={classes.listButton}
        disabled={disabled}
        button={true}
        onClick={this.handleOnClick}
      >
        <Typography color={this.getColor()} variant={selected ? 'h6' : 'button'}>
          {children}
        </Typography>
      </ListItem>
    );
  }
}

export default withStyles(styles)(PickerListItem);
