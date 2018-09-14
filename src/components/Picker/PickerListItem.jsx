import React from 'react';
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

  render() {
    const { selected, children, classes } = this.props;

    return (
      <ListItem className={classes.listButton} button={true} onClick={this.handleOnClick}>
        <Typography color={selected ? 'primary' : 'textPrimary'} variant={selected ? 'title' : 'button'}>
          {children}
        </Typography>
      </ListItem>
    );
  }
}

const enhance = withStyles(({ palette }) => ({
  listButton: {
    display: 'flex',
    justifyContent: 'center',
    color: palette.text.primary
  }
}));

export default enhance(PickerListItem);
