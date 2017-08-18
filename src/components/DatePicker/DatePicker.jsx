import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker as AntdDatePicker } from 'antd';
import classNames from 'classnames';

import './DatePicker.scss';

const getCalendarContainer = (trigger) => {
  // ui-128 container
  return trigger.parentNode.parentNode;
};

function DatePicker({ className, rangePicker = false, ...otherProps }) {
  const newProps = {
    getCalendarContainer,
    ...otherProps
  };

  if (rangePicker) {
    return (
      <span className={classNames(className, 'ui-128', 'ui-128__date-picker', 'ui-128__range-picker')}>
        <AntdDatePicker.RangePicker {...newProps} />
      </span>
    );
  }

  return (
    <span className={classNames(className, 'ui-128', 'ui-128__date-picker')}>
      <AntdDatePicker {...newProps} />
    </span>
  );
}

DatePicker.propTypes = {
  /**
   * When true, transforms the DatePicker component into a Range Picker.
   */
  rangePicker: PropTypes.bool
};

export default DatePicker;
