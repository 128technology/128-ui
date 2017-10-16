import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Dropdown as AntdDropdown } from 'antd';

import './SplitButton.scss';

function SplitButton({ className, disabled, ...otherProps }) {
  return (
    <span className={classNames(className, 'ui-128', 'ui-128__split-button', { disabled })}>
      {disabled && <div className="disabled-overlay" />}
      <AntdDropdown.Button {...otherProps} trigger={['click']} />
    </span>
  );
}

SplitButton.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool
};

SplitButton.defaultProps = {
  disabled: false
};

export default SplitButton;
