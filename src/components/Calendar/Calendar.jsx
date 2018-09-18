import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Week from './Week';
import Dotw from './Dotw';

function getNestedDateRange(date) {
  const start = date
    .clone()
    .startOf('month')
    .startOf('week');

  const end = date
    .clone()
    .endOf('month')
    .endOf('week');

  const dayCount = end.diff(start, 'days');
  const calendarDays = _.range(0, dayCount + 1).map(d => start.clone().add(d, 'days'));
  return _.chunk(calendarDays, 7);
}

class Calendar extends React.Component {
  render() {
    const { date, dayRenderer, disableDay, selectDay } = this.props;
    const monthRange = getNestedDateRange(date);

    return (
      <div>
        <Dotw />
        {monthRange.map(w => (
          <Week
            date={date}
            key={w[0]}
            days={w}
            dayRenderer={dayRenderer}
            disableDay={disableDay}
            selectDay={selectDay}
          />
        ))}
      </div>
    );
  }
}

Calendar.propTypes = {
  date: PropTypes.instanceOf(moment),
  dayRenderer: PropTypes.func,
  disableDay: PropTypes.func,
  selectDay: PropTypes.func
};

Calendar.defaultProps = {
  date: moment()
};

export default Calendar;
