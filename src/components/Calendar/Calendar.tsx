import * as _ from 'lodash';
import * as React from 'react';
import * as moment from 'moment';

import Week, { IProps as WeekProps } from './Week';
import Dotw from './Dotw';

export interface IProps {
  date?: moment.Moment;
  dayRenderer?: WeekProps['dayRenderer'];
  selectDay?: WeekProps['selectDay'];
  disableDay?: WeekProps['disableDay'];
}

const Calendar: React.FunctionComponent<IProps> = ({ date = moment(), dayRenderer, disableDay, selectDay }) => {
  const monthRange = getNestedDateRange(date);

  return (
    <div>
      <Dotw />
      {monthRange.map(w => (
        <Week
          date={date}
          key={w[0].toString()}
          days={w}
          dayRenderer={dayRenderer}
          disableDay={disableDay}
          selectDay={selectDay}
        />
      ))}
    </div>
  );
};

function getNestedDateRange(date: moment.Moment) {
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

export default Calendar;
