import * as _ from 'lodash';
import * as React from 'react';
import * as moment from 'moment';

import PickerList from './PickerList';

export interface IProps {
  minDate?: moment.Moment;
  maxDate?: moment.Moment;
  format?: string;
  date?: moment.Moment;
  disableDate?: (date: moment.Moment) => boolean;
  yearOnClick?: (e: React.MouseEvent<HTMLElement>, date: moment.Moment) => void;
}

const YearPicker: React.FunctionComponent<IProps> = ({
  minDate = moment().subtract(50, 'years'),
  maxDate = moment().add(50, 'years'),
  format = 'YYYY',
  date = moment(),
  yearOnClick,
  disableDate
}) => {
  const yearRange = getYearRange(minDate, maxDate);

  return (
    <PickerList
      selected={d => d.year() === date.year()}
      itemOnClick={yearOnClick}
      data={yearRange}
      format={format}
      disabled={disableDate}
    />
  );
};

function getYearRange(minDate: moment.Moment, maxDate: moment.Moment) {
  const yearCount = maxDate.diff(minDate, 'year');
  return _.range(0, yearCount + 1).map(d => minDate.clone().add(d, 'years'));
}

export default YearPicker;
