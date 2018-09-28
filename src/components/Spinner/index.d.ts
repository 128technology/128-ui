import * as React from 'react';

export enum SpinnerSize {
  small,
  medium,
  large,
  huge
}

export interface ISpinnerProps {
  size?: SpinnerSize;
}

declare function Spinner(props: ISpinnerProps): JSX.Element;

export default Spinner;
