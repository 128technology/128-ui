import * as React from 'react';

export type LoadingSize =
  'small' |
  'medium' |
  'large' |
  'huge'

export interface ILoadingProps {
  size?: LoadingSize;
  block?: boolean;
  showLoadingText?: boolean;
  horizontal?: boolean;
  loadingText?: string;
}

declare function Loading(props: ILoadingProps): JSX.Element;

export default Loading;
