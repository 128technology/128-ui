import React from 'react';
import { Menu as AntdMenu } from 'antd';

import './Menu.scss';

const Menu = ({ className = '', ...otherProps }) => (
  <AntdMenu {...otherProps} className={`${className} ui-128 ui-128__menu`} />
);

export default Menu;
