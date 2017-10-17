import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import { Dropdown as AntdDropdown } from 'antd';

import './SplitButton.scss';

function SplitButton({ className, disabled, onClick, ...otherProps }) {
  return (
    <span className={classNames(className, 'ui-128', 'ui-128__split-button', { disabled })}>
      <AntdDropdown.Button
        onClick={!disabled ? onClick : _.noop}
        {...otherProps}
        trigger={!disabled ? ['click'] : []}
      />
    </span>
  );
}

SplitButton.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

SplitButton.defaultProps = {
  disabled: false,
  onClick: _.noop
};

export default SplitButton;
