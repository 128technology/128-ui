import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';

function CalendarController({ date, format, classes, prevMonthOnClick, nextMonthOnClick }) {
  return (
    <div className={classes.container}>
      <IconButton className={classes.iconButton} onClick={prevMonthOnClick}>
        <i className="mdi mdi-chevron-left" />
      </IconButton>
      <Typography align="center" variant="body1">
        {date.format(format)}
      </Typography>
      <IconButton className={classes.iconButton} onClick={nextMonthOnClick}>
        <i className="mdi mdi-chevron-right" />
      </IconButton>
    </div>
  );
}

CalendarController.propTypes = {
  date: PropTypes.instanceOf(moment),
  format: PropTypes.string
};

CalendarController.defaultProps = {
  date: moment(),
  format: 'MMMM YYYY'
};

const enhance = withStyles(({ spacing }) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  iconButton: {
    '&:hover': {
      backgroundColor: 'transparent'
    }
  }
}));

export default enhance(CalendarController);
