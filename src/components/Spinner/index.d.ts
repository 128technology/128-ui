import * as React from 'react';

export type SpinnerSize = 
  'small' |
  'medium' |
  'large' |
  'huge'

export interface ISpinnerProps {
  size?: SpinnerSize;
}

declare function Spinner(props: ISpinnerProps): JSX.Element;

export default Spinner;
