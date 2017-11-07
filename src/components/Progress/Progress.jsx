import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Progress as AntdProgress } from 'antd';

import './Progress.scss';

/**
 * Simple wrapper around the ant-design progress component
 */
function Progress({ className, ...otherProps }) {
  return (
    <span className={classNames(className, 'ui-128', 'ui-128__progress')}>
      <AntdProgress {...otherProps} />
    </span>
  );
}

Progress.propTypes = {
  className: PropTypes.string
};

export default Progress;
