import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button as AntdButton } from 'antd';

import './Button.scss';

/**
 * Simple wrapper around the ant-design button component
 */
function Button({ className, ...otherProps }) {
  return (
    <span className={classNames(className, 'ui-128', 'ui-128__button')}>
      <AntdButton {...otherProps} />
    </span>
  );
}

Button.propTypes = {
  className: PropTypes.string
};

export default Button;
