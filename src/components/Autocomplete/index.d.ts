import * as React from 'react';
import { CommonProps } from 'react-select/src/types';

export interface IAutocompleteProps extends CommonProps {
  options: any[];
  accessors?: {
    value: (d: any) => any;
    label: (d: any) => any;
  };
  groupBy?: (d: any) => any;
  creatable?: boolean;
  async?: boolean;
  loading?: boolean;
  loadOptions?: () => Promise<any[]>;
  selection?: any;
  onChange?: (val: any) => void;
  optionRenderer?: (props: any) => JSX.Element;
  placeholder?: string;
  errorText?: string;
  visibleRows?: number;
  rowHeight?: number;
  disabled?: boolean;
  textFieldProps?: { [key: string]: any }
  classes?: {
    input?: string;
    valueContainer?: string;
    chipFocused?: string;
    chip?: string;
    noOptionsMessage?: string;
    placeholder?: string;
  }
}

declare class Autocomplete extends React.Component<IAutocompleteProps, any> {}

export default Autocomplete;