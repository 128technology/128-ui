import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';

import Day from './Day';

export function inCurrentMonth(month, date) {
  const lastMonth = month.clone().subtract(1, 'month');
  const nextMonth = month.clone().add(1, 'month');
  return date.isAfter(lastMonth, 'month') && date.isBefore(nextMonth, 'month');
}

function CalendarWeek({ date, days, classes, dayRenderer, disableDay, selectDay }) {
  return (
    <div className={classes.week}>
      {days.map(d => (
        <Day
          key={d}
          date={d}
          inCurrentMonth={inCurrentMonth(date, d)}
          renderer={dayRenderer}
          disabled={disableDay(d, inCurrentMonth(date, d))}
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
  disableDay: PropTypes.func,
  selectDay: PropTypes.func
};

CalendarWeek.defaultProps = {
  disableDay: x => false,
  selectDay: x => false,
  classes: {}
};

const enhance = withStyles(() => ({
  week: {
    display: 'flex',
    alignItems: 'center'
  }
}));

export default enhance(CalendarWeek);
