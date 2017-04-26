import React from 'react';
import { Tabs as AntdTabs } from 'antd';

import './Tabs.scss';

/**
 * 128 wrapper for the Ant Design `<Tabs />` component.
 * 
 * Please see the [Ant Design Tabs documentation](https://ant.design/components/tabs/)
 */
const Tabs = ({ className, inline, ...otherProps }) => {
  let newClassName = `${className} ui-128__tabs ui-128`;

  if (inline) {
    newClassName = `${newClassName} ui-128__tabs--inline`;
  }

  return (
    <AntdTabs {...otherProps} className={newClassName} />
  );
};

Tabs.propTypes = {
  /**
   * Sets the tab bar style to inline.
   */
  inline: React.PropTypes.bool
};

export default Tabs;
