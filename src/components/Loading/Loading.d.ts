import * as React from 'react';

export enum Size {
  small,
  medium,
  large,
  huge
}

export interface ILoadingProps {
  size?: Size
  block?: boolean;
  showLoadingText?: boolean;
  horizontal?: boolean;
  loadingText?: string;
}

declare function Loading(props: ILoadingProps): JSX.Element;

export default Loading;
