import * as React from 'react';

export enum Variant {
  flat,
  raised
}

export interface ISplitButtonProps {
  variant: Variant;
  color: string;
  popoverContent: React.ReactNode;
  defaultOnClick: (e: React.SyntheticEvent) => void;
  children: React.ReactNode;
  dropdownIconClassName: string;
  disabled: boolean;
  dropdownDisabled: boolean;
  closePopoverOnClick: boolean;
}

declare class SplitButton extends React.Component<ISplitButtonProps, any> {}

export default SplitButton;
