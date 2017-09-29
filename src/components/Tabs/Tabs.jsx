import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Tabs as AntdTabs } from 'antd';

import './Tabs.scss';

/**
 * 128 wrapper for the Ant Design `<Tabs />` component.
 *
 * Please see the [Ant Design Tabs documentation](https://ant.design/components/tabs/)
 */
function Tabs({ className, inline, ...otherProps }) {
  const newClasses = [className, 'ui-128__tabs', 'ui-128'];

  if (inline) {
    newClasses.push('ui-128__tabs--inline');
  }

  return <AntdTabs {...otherProps} className={classNames(newClasses)} />;
}

Tabs.propTypes = {
  /**
   * Sets the tab bar style to inline.
   */
  inline: PropTypes.bool
};

export default Tabs;
