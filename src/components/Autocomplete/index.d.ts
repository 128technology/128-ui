import * as React from 'react';

export interface IAutocompleteProps {
  options: any[];
  accessors?: {
    value: (d: any) => any;
    label: (d: any) => any;
  };
  groupBy?: (d: any) => any;
  creatable?: boolean;
  async?: boolean;
  loadOptions?: () => Promise<any[]>;
  selection?: any;
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