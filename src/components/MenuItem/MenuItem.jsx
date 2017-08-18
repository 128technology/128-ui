import React from 'react';
import classNames from 'classnames';
import { Menu as AntdMenu } from 'antd';

import './MenuItem.scss';

function MenuItem({ className, ...otherProps }) {
  return (
    <AntdMenu.Item {...otherProps} className={classNames(className, 'ui-128', 'ui-128__menu-item')} />
  );
}

export default MenuItem;
