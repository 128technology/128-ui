import React from 'react';
import classNames from 'classnames';
import { TimePicker as AntdTimePicker } from 'antd';

import './TimePicker.scss';

const getPopupContainer = (trigger) => {
  // ui-128 container
  return trigger.parentNode;
};

function TimePicker({ className, ...otherProps }) {
  return (
    <span className={classNames(className, 'ui-128', 'ui-128__time-picker')}>
      <AntdTimePicker {...otherProps} getPopupContainer={getPopupContainer} />
    </span>
  );
}

export default TimePicker;
