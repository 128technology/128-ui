import React from 'react';
import { Tabs as AntdTabs } from 'antd';

import './Tabs.scss';

/**
 * 128 wrapper for the Ant Design `<Tabs />` component.
 * 
 * Please see the [Ant Design Tabs documentation](https://ant.design/components/tabs/)
 */
const Tabs = (props) => (
  <AntdTabs {...props} className={`${props.className} ui-128__tabs ui-128`} />
);

export default Tabs;
