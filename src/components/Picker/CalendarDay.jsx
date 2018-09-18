import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';

class CalendarDay extends React.Component {
  handleDayOnClick = e => {
    const { dayProps, date, onClick } = this.props;

    if (onClick && !dayProps.disabled) {
      onClick(e, date);
    }
  };

  handleDayOnMouseEnter = e => {
    const { dayProps, date, onMouseEnter } = this.props;

    if (onMouseEnter && !dayProps.disabled) {
      onMouseEnter(e, date);
    }
  };

  render() {
    const { dayProps, children, date, startDate, endDate, classes } = this.props;
    const betweenDate = startDate && endDate && date.isAfter(startDate) && date.isBefore(endDate.startOf('day'));
    const endCap = startDate && endDate && dayProps.selected && !startDate.isSame(endDate, 'day');
    const weekStartCap = betweenDate && date.day() === 0;
    const weekEndCap = betweenDate && date.day() === 6;

    return (
      <div
        className={classNames({
          [classes.betweenDate]: (betweenDate || endCap) && dayProps.inCurrentMonth,
          [classes.leftEndCap]: startDate && endCap && date.isSame(startDate, 'day'),
          [classes.rightEndCap]: endDate && endCap && date.isSame(endDate, 'day'),
          [classes.weekStartCap]: weekStartCap,
          [classes.weekEndCap]: weekEndCap
        })}
        onClick={this.handleDayOnClick}
        onMouseEnter={this.handleDayOnMouseEnter}
      >
        {children}
      </div>
    );
  }
}

CalendarDay.propTypes = {
  dayProps: PropTypes.object,
  date: PropTypes.instanceOf(moment),
  startDate: PropTypes.instanceOf(moment),
  endDate: PropTypes.instanceOf(moment),
  classes: PropTypes.object
};

CalendarDay.defaultProps = {
  dayProps: {},
  date: moment(),
  startDate: moment(),
  endDate: moment(),
  classes: {}
};

const enhance = withStyles(({ palette, shape }) => ({
  betweenDate: {
    height: 36,
    width: 36,
    backgroundColor: palette.primary.light
  },
  leftEndCap: {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%'
  },
  rightEndCap: {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%'
  },
  weekStartCap: {
    borderTopLeftRadius: shape.borderRadius,
    borderBottomLeftRadius: shape.borderRadius
  },
  weekEndCap: {
    borderTopRightRadius: shape.borderRadius,
    borderBottomRightRadius: shape.borderRadius
  }
}));

export default enhance(CalendarDay);
