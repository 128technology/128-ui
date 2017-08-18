import React from 'react';
import classNames from 'classnames';
import { Dropdown as AntdDropdown } from 'antd';

import './SplitButton.scss';

function SplitButton({ className, ...otherProps }) {
  return (
    <span className={classNames(className, 'ui-128', 'ui-128__split-button')}>
      <AntdDropdown.Button {...otherProps} trigger={['click']} />
    </span>
  );
}

export default SplitButton;
