import * as React from 'react';

export enum Size {
  small,
  medium,
  large,
  huge
}

export interface ISpinnerProps {
  size?: Size 
}

declare function Spinner(props: ISpinnerProps): JSX.Element;

export default Spinner;
