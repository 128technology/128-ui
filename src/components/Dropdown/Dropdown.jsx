import React from 'react';
import { Dropdown as AntdDropdown } from 'antd';
import classNames from 'classnames';

import './Dropdown.scss';

function Dropdown({ className, children, ...otherProps }) {
  return (
    <div className={classNames('ui-128', 'ui-128__dropdown', className)}>
      <AntdDropdown {...otherProps}>{children}</AntdDropdown>
    </div>
  );
}

export default Dropdown;
