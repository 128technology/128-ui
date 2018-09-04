import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Spinner } from '../Spinner';
import './Loading.scss';

function Loading({ size, block, horizontal, showLoadingText, loadingText }) {
  const className = classNames(
    {
      'loading--horizontal': horizontal,
      'loading--small': size === 'small',
      'loading--large': size === 'large',
      'loading--huge': size === 'huge',
      'loading--block': block
    },
    'loading',
    'ui-128',
    'ui-128__loading'
  );

  return (
    <div className={className}>
      <Spinner size={size} />
      {showLoadingText ? <div className="loading__text">{loadingText}</div> : null}
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
  loadingText: 'Loading...'
};

export default Loading;
