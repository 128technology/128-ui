import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

class PickerListItem extends React.Component {
  handleOnClick = e => {
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
    const { selected, disabled, children, classes } = this.props;

    return (
      <ListItem className={classes.listButton} disabled={disabled} button={true} onClick={this.handleOnClick}>
        <Typography color={this.getColor()} variant={selected ? 'title' : 'button'}>
          {children}
        </Typography>
      </ListItem>
    );
  }
}

PickerListItem.propTypes = {
  selected: PropTypes.bool
};

PickerListItem.defaultProps = {
  selected: false
};

const enhance = withStyles(({ palette }) => ({
  listButton: {
    display: 'flex',
    justifyContent: 'center',
    color: palette.text.primary
  }
}));

export default enhance(PickerListItem);
