import React from 'react';
import { Menu as AntdMenu } from 'antd';

import './MenuItem.scss';

const MenuItem = ({ className = '', ...otherProps }) => (
  <AntdMenu.Item {...otherProps} className={`${className} ui-128 ui-128__menu-item`} />
);

export default MenuItem;
