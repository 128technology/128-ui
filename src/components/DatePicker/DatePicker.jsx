import React from 'react';
import { DatePicker as AntdDatePicker } from 'antd';

import './DatePicker.scss';

const getCalendarContainer = (trigger) => {
  // ui-128 container
  return trigger.parentNode.parentNode;
};

const DatePicker = ({ className = '', rangePicker, ...otherProps }) => {
  otherProps = {
    getCalendarContainer,
    ...otherProps
  };

  if (rangePicker) {
    return (
      <span className={`${className} ui-128 ui-128__date-picker ui-128__range-picker`}>
        <AntdDatePicker.RangePicker {...otherProps} />
      </span>
    );
  }

  return (
    <span className={`${className} ui-128 ui-128__date-picker`}>
      <AntdDatePicker {...otherProps} />
    </span>
  );
};

export default DatePicker;
