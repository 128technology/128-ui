import React from 'react';
import { Tabs as AntdTabs } from 'antd';

import './TabPane.scss';

const AntdTabPane = AntdTabs.TabPane;

/**
 * 128 wrapper for the Ant Design `<TabPane />` component.
 * 
 * Please see the [Ant Design Tabs documentation](https://ant.design/components/tabs/)
 */
const TabPane = (props) => (
  <AntdTabPane {...props} className={`${props.className} ui-128__tab-pane ui-128`} />
);

export default TabPane;
