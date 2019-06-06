import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';

import Spinner from '../Spinner';
import './Loading.scss';

export interface IProps {
  size?: 'small' | 'medium' | 'large' | 'huge';
  block?: boolean;
  showLoadingText?: boolean;
  horizontal?: boolean;
  loadingText?: string;
  className?: string;
}

function Loading({ size, block, horizontal, showLoadingText, loadingText, className }: IProps) {
  const classes = classNames(
    className,
    {
      'ui-128__loading--horizontal': horizontal,
      'ui-128__loading--small': size === 'small',
      'ui-128__loading--large': size === 'large',
      'ui-128__loading--huge': size === 'huge',
      'ui-128__loading--block': block
    },
    'ui-128',
    'ui-128__loading'
  );

  return (
    <div className={classes}>
      <Spinner size={size} />
      {showLoadingText ? <div className="ui-128__loading__text">{loadingText}</div> : null}
    </div>
  );
}

Loading.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large', 'huge']),
  block: PropTypes.bool,
  showLoadingText: PropTypes.bool,
  horizontal: PropTypes.bool,
  loadingText: PropTypes.string
};

Loading.defaultProps = {
  size: 'medium',
  block: false,
  horizontal: false,
  showLoadingText: true,
  loadingText: 'Loading'
};

export default Loading;
