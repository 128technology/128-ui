import React from 'react';
import { Tabs as AntdTabs } from 'antd';

import './Tabs.scss';

/**
 * 128 wrapper for the Ant Design `<Tabs />` component.
 * 
 * Please see the [Ant Design Tabs documentation](https://ant.design/components/tabs/)
 */
const Tabs = (props) => {
  let className = `${props.className} ui-128__tabs ui-128`;

  if (props.inline) {
    className = `${className} ui-128__tabs--inline`;
  }

  return (
    <AntdTabs {...props} className={className} />
  );
};

Tabs.propTypes = {
  /**
   * Sets the tab bar style to inline.
   */
  inline: React.PropTypes.bool
};

export default Tabs;
