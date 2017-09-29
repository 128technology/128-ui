import React from 'react';
import classNames from 'classnames';
import { Menu as AntdMenu } from 'antd';

import './SubMenu.scss';

function SubMenu({ className, ...otherProps }) {
  return <AntdMenu.SubMenu {...otherProps} className={classNames(className, 'ui-128', 'ui-128__submenu')} />;
}

export default SubMenu;
