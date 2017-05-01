import React from 'react';
import { Dropdown as AntdDropdown } from 'antd';

import './SplitButton.scss';

const SplitButton = ({ className = '', ...otherProps }) => (
  <span className={`${className} ui-128 ui-128__split-button`}>
    <AntdDropdown.Button {...otherProps} trigger={['click']} />
  </span>
);

export default SplitButton;
