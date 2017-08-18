import React from 'react';
import { Tabs as AntdTabs } from 'antd';
import classNames from 'classnames';

import './TabPane.scss';

const AntdTabPane = AntdTabs.TabPane;

/**
 * 128 wrapper for the Ant Design `<TabPane />` component.
 *
 * Please see the [Ant Design Tabs documentation](https://ant.design/components/tabs/)
 */
function TabPane({ className, ...otherProps }) {
  return (
    <AntdTabPane {...otherProps} className={classNames(className, 'ui-128__tab-pane', 'ui-128')} />
  );
}

export default TabPane;
