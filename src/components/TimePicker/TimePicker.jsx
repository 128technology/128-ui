import React from 'react';
import { TimePicker as AntdTimePicker } from 'antd';

import './TimePicker.scss';

const getPopupContainer = (trigger) => {
  // ui-128 container
  return trigger.parentNode;
};

const TimePicker = ({ className = '', ...otherProps }) => (
  <span className={`${className} ui-128 ui-128__time-picker`}>
    <AntdTimePicker {...otherProps} getPopupContainer={getPopupContainer} />
  </span>
);

export default TimePicker;
