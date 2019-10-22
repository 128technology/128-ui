import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import { styled } from '@material-ui/core/styles';

import Spinner from '../Spinner';
import './Loading.scss';

export interface IProps {
  size?: 'small' | 'medium' | 'large' | 'huge';
  block?: boolean;
  horizontal?: boolean;
  loadingText?: string;
  className?: string;
  icon?: React.ReactNode;
}

const LoadingText = styled('div')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontFamily: theme.typography.subtitle1.fontFamily
}));

function Loading({ size, block, horizontal, loadingText, className, icon }: IProps) {
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
      <Spinner size={size} icon={icon} />
      {loadingText ? <LoadingText className="ui-128__loading__text">{loadingText}</LoadingText> : null}
    </div>
  );
}

Loading.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large', 'huge']),
  block: PropTypes.bool,
  horizontal: PropTypes.bool,
  loadingText: PropTypes.string
};

Loading.defaultProps = {
  size: 'medium',
  block: false,
  horizontal: false
};

export default Loading;
