import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import PickerList from './PickerList';

function getYearRange(minDate, maxDate) {
  const yearCount = maxDate.diff(minDate, 'year');
  return _.range(0, yearCount + 1).map(d => minDate.clone().add(d, 'years'));
}

class YearPicker extends React.Component {
  render() {
    const { minDate, maxDate, format, date, yearOnClick, disableDate } = this.props;
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
  }
}

YearPicker.propTypes = {
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  format: PropTypes.string,
  date: PropTypes.object,
  yearOnClick: PropTypes.func,
  disableDate: PropTypes.func
};

YearPicker.defaultProps = {
  minDate: moment().subtract(50, 'years'),
  maxDate: moment().add(50, 'years'),
  format: 'YYYY',
  date: moment()
};

export default YearPicker;
