import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';

import './Spinner.scss';

export interface IProps {
  size?: 'small' | 'medium' | 'large' | 'huge';
}

function Spinner({ size = 'medium' }: IProps) {
  const className = classNames(
    {
      'ui-128__spinner--small': size === 'small',
      'ui-128__spinner--large': size === 'large',
      'ui-128__spinner--huge': size === 'huge'
    },
    'ui-128__spinner',
    'ui-128'
  );

  return (
    <div className={className}>
      <div className="ui-128__spinner-pulse-outer" />
      <div className="ui-128__spinner-pulse-inner" />
      <div className="ui-128__spinner-icon-outer">
        <svg className="ui-128__spinner-icon" viewBox="0 0 28 13">
          <g>
            <path
              className="ui-128__spinner-icon-piece"
              d="M11,1H1.5C1.3,1,1.1,1.2,1,1.4c0,0,0,0.1,0,0.1V11c0,0.3,0.2,0.5,0.5,0.5H4c0.3,0,0.5-0.2,0.5-0.5V5.7C4.5,5,5,4.5,5.6,4.5H11c0.3,0,0.5-0.2,0.5-0.5V1.5C11.5,1.2,11.3,1,11,1z"
            />
            <path
              className="ui-128__spinner-icon-piece"
              d="M18.5,1.5C18.5,1.2,18.3,1,18,1h-2.5C15.3,1,15,1.2,15,1.5v5.2c0,0,0,0,0,0C15,7.5,14.8,8,13.8,8H8.5C8.3,8,8,8.2,8,8.5V11c0,0.3,0.2,0.5,0.5,0.5H18c0.2,0,0.4-0.2,0.5-0.4c0,0,0-0.1,0-0.1V1.5z"
            />
            <path
              className="ui-128__spinner-icon-piece"
              d="M22.1,4V1.5c0-0.3,0.2-0.5,0.5-0.5H25c0.3,0,0.5,0.2,0.5,0.5V4c0,0.3-0.2,0.5-0.5,0.5h-2.4C22.3,4.5,22.1,4.3,22.1,4"
            />
            <path
              className="ui-128__spinner-icon-piece"
              d="M22.1,11V8.5c0-0.3,0.2-0.5,0.5-0.5H25c0.3,0,0.5,0.2,0.5,0.5V11c0,0.3-0.2,0.5-0.5,0.5h-2.4C22.3,11.5,22.1,11.3,22.1,11"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

Spinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large', 'huge'])
};

Spinner.defaultProps = {
  size: 'medium'
};

export default Spinner;
