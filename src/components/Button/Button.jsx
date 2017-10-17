import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import { Button as AntdButton } from 'antd';

import './Button.scss';

/**
 * Simple wrapper around the ant-design button component
 */
function Button({ className, disabled, onClick, ...otherProps }) {
  return (
    <span className={classNames(className, 'ui-128', 'ui-128__button', { disabled })}>
      <AntdButton onClick={!disabled ? onClick : _.noop} {...otherProps} />
    </span>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

Button.defaultProps = {
  disabled: false,
  onClick: _.noop
};

export default Button;
