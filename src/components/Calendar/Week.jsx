import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';

import Day from './Day';

function CalendarWeek({ date, days, classes, dayRenderer, dayProps, disableDay, selectDay }) {
  const lastMonth = date.clone().subtract(1, 'month');
  const nextMonth = date.clone().add(1, 'month');

  return (
    <div className={classes.week}>
      {days.map(d => (
        <Day
          key={d}
          date={d}
          inCurrentMonth={d.isAfter(lastMonth, 'month') && d.isBefore(nextMonth, 'month')}
          renderer={dayRenderer}
          props={dayProps}
          disabled={disableDay(d)}
          selected={selectDay(d)}
        />
      ))}
    </div>
  );
}

CalendarWeek.propTypes = {
  date: PropTypes.instanceOf(moment),
  days: PropTypes.array,
  classes: PropTypes.object,
  dayRenderer: PropTypes.func,
  dayProps: PropTypes.object,
  disableDay: PropTypes.func,
  selectDay: PropTypes.func
};

CalendarWeek.defaultProps = {
  disableDay: x => false,
  selectDay: x => false
};

const enhance = withStyles(() => ({
  week: {
    display: 'flex',
    alignItems: 'center'
  }
}));

export default enhance(CalendarWeek);
