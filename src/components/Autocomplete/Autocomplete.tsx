import * as _ from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import classNames from 'classnames';
import { List } from 'react-virtualized';
import { withStyles, Theme, WithStyles, createStyles } from '@material-ui/core/styles';
import { ValueType, GroupType } from 'react-select/lib/types';
import { ValueContainerProps } from 'react-select/lib/components/containers';
import { PlaceholderProps } from 'react-select/lib/components/Placeholder';
import { OptionProps } from 'react-select/lib/components/Option';
import { NoticeProps, MenuListComponentProps, MenuProps } from 'react-select/lib/components/Menu';
import { MultiValueProps } from 'react-select/lib/components/MultiValue';
import { getOptionValue, getOptionLabel } from 'react-select/lib/builtins';
import { ControlProps } from 'react-select/lib/components/Control';

const styles = ({ spacing, palette }: Theme) =>
  createStyles({
    input: {
      display: 'flex',
      padding: 0,
      '& > div:last-child > span': {
        backgroundColor: 'transparent'
      }
    },
    valueContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      flex: 1,
      alignItems: 'center'
    },
    chipFocused: {
      backgroundColor: palette.primary.main,
      color: palette.primary.contrastText
    },
    chip: {
      marginRight: spacing.unit * 0.5,
      marginBottom: spacing.unit * 0.5
    },
    noOptionsMessage: {
      boxSizing: 'border-box',
      padding: spacing.unit,
      display: 'flex',
      alignItems: 'center'
    },
    menuItem: {
      boxSizing: 'border-box'
    },
    placeholder: {},
    inputUnderline: {
      borderBottom: '0',
      '&::before': {
        borderBottom: '1px solid rgba(0, 0, 0, 0.42) !important'
      }
    },
    inputUnderlineDisabled: {
      borderBottom: '0',
      '&::before': {
        borderBottom: '1px dotted rgba(0, 0, 0, 0.42) !important'
      }
    }
  });

function InputComponent({ inputRef, ...rest }: any) {
  return <div ref={inputRef} {...rest} />;
}

function NoOptionsMessage<OptionType>({ children, selectProps, innerProps }: NoticeProps<OptionType>) {
  return (
    <Typography
      color="textSecondary"
      className={selectProps.classes.noOptionsMessage}
      style={{ height: selectProps.rowHeight }}
      {...innerProps}
    >
      {children}
    </Typography>
  );
}

function Control<OptionType>({ selectProps, innerRef, innerProps, children }: ControlProps<OptionType>) {
  const { InputProps = {}, ...rest } = selectProps.textFieldProps;
  const inputPropsClasses = InputProps.classes || {};

  return (
    <TextField
      fullWidth={true}
      InputProps={{
        ...InputProps,
        inputComponent: InputComponent,
        classes: {
          input: classNames(inputPropsClasses.input, selectProps.classes.input),
          underline: classNames(
            inputPropsClasses.underline,
            selectProps.classes.inputUnderline,
            selectProps.isDisabled && selectProps.classes.inputUnderlineDisabled
          ),
          ...inputPropsClasses
        },
        inputProps: {
          inputRef: innerRef,
          children: children,
          ...innerProps
        }
      }}
      {...rest}
    />
  );
}

function Option<OptionType>(props: OptionProps<OptionType>) {
  const { innerRef, isFocused, innerProps, children, selectProps } = props;

  return (
    <MenuItem
      buttonRef={innerRef}
      selected={isFocused}
      component="div"
      className={selectProps.classes.menuItem}
      style={{ height: selectProps.rowHeight }}
      {...innerProps}
    >
      {_.isFunction(selectProps.optionRenderer) ? selectProps.optionRenderer(props) : children}
    </MenuItem>
  );
}

function Placeholder<OptionType>({ selectProps, innerProps, children }: PlaceholderProps<OptionType>) {
  return (
    <Typography color="textSecondary" className={selectProps.classes.placeholder} {...innerProps}>
      {children}
    </Typography>
  );
}

function ValueContainer<OptionType>({ selectProps, children }: ValueContainerProps<OptionType>) {
  return <div className={selectProps.classes.valueContainer}>{children}</div>;
}

function MultiValue<OptionType>({ children, selectProps, isFocused, removeProps, data }: MultiValueProps<OptionType>) {
  return (
    <Chip
      avatar={selectProps.chipAvatar ? selectProps.chipAvatar(data) : undefined}
      tabIndex={-1}
      label={children}
      className={classNames(selectProps.classes.chip, {
        [selectProps.classes.chipFocused]: isFocused
      })}
      onDelete={event => {
        removeProps.onClick(event);
        removeProps.onMouseDown(event);
      }}
    />
  );
}

function MenuList<OptionType>({ selectProps, children }: MenuListComponentProps<OptionType>) {
  const rowCount = children && Array.isArray(children) && _.isNumber(children.length) ? children.length : 1;
  const visibleRows = Math.min(selectProps.visibleRows, rowCount);

  return (
    <List
      width={selectProps.selectWidth}
      height={visibleRows * selectProps.rowHeight}
      rowCount={rowCount}
      rowHeight={selectProps.rowHeight}
      rowRenderer={({ key, index, style }) => {
        return (
          <div key={key} style={style}>
            {_.isArray(children) ? children[index] : children}
          </div>
        );
      }}
    />
  );
}

function Menu<OptionType>({ selectProps, children, innerProps }: MenuProps<OptionType>) {
  return (
    <Paper
      elevation={1}
      className={selectProps.classes.paper}
      style={{ maxWidth: selectProps.selectWidth, width: selectProps.selectWidth || 'auto' }}
      {...innerProps}
    >
      {children}
    </Paper>
  );
}

function formatGroupLabel<OptionType>(data: GroupType<OptionType>) {
  return (
    <Typography color="textSecondary" variant="subheading">
      {data.label}
    </Typography>
  );
}

interface IDefaultOptionType {
  label: string;
  value: string;
}

export interface IProps<OptionType = IDefaultOptionType> extends WithStyles<typeof styles> {
  options: OptionType[];
  getOptionLabel?: getOptionLabel<OptionType>;
  getOptionValue?: getOptionValue<OptionType>;
  chipAvatar?: (d: OptionType) => React.ReactNode;
  groupBy?: (d: OptionType) => string | undefined | null;
  creatable?: boolean;
  isLoading?: boolean;
  selection?: string | ValueType<OptionType>;
  onChange?: (val: ValueType<OptionType>) => void;
  optionRenderer?: (props: OptionProps<OptionType>) => JSX.Element;
  placeholder?: string;
  errorText?: string;
  visibleRows?: number;
  rowHeight?: number;
  disabled?: boolean;
  isClearable?: boolean;
  textFieldProps?: { [key: string]: any };
  className?: string;
  isMulti?: boolean;
}

export function Autocomplete<OptionType = IDefaultOptionType>(props: IProps<OptionType>) {
  const ref = React.createRef<any>();
  const [width, setWidth] = React.useState<number | null>(null);
  const [currentSelection, setCurrentSelection] = React.useState<ValueType<OptionType>>(null);

  const {
    classes,
    creatable,
    errorText,
    groupBy,
    textFieldProps,
    disabled,
    selection,
    onChange,
    options,
    rowHeight = 48,
    visibleRows = 5,
    ...rest
  } = props;

  React.useEffect(() => {
    const assignWidth = () => {
      const node = ReactDOM.findDOMNode(ref.current);
      if (node && 'clientWidth' in node) {
        setWidth(node.clientWidth);
      }
    };

    assignWidth();
    window.addEventListener('resize', assignWidth);
    return () => window.removeEventListener('resize', assignWidth);
  }, []);

  const handleOnChange = React.useCallback(
    (newSelection: ValueType<OptionType>) => {
      if (onChange) {
        onChange(newSelection);
      }

      if (!selection) {
        setCurrentSelection(newSelection);
      }
    },
    [onChange, selection]
  );

  const items = React.useMemo(() => {
    if (!groupBy) {
      return options;
    }

    const groups = _.groupBy(options, groupBy);
    return _.map(groups, (x, k) => ({
      label: k,
      options: x
    }));
  }, [groupBy, options]);

  let value: ValueType<OptionType> = null;
  if (_.isString(selection)) {
    value = { label: selection, value: selection } as any;
  } else if (selection !== undefined) {
    value = selection;
  } else {
    value = currentSelection;
  }

  const virtualized = groupBy ? {} : { MenuList };

  const common = {
    ...rest,
    isDisabled: disabled,
    ref,
    rowHeight,
    visibleRows,
    classes,
    components: {
      ...virtualized,
      Control,
      Menu,
      MultiValue,
      NoOptionsMessage,
      Option,
      Placeholder,
      ValueContainer
    },
    textFieldProps: {
      label: '',
      InputLabelProps: {
        shrink: true
      },
      error: Boolean(errorText),
      helperText: errorText,
      ...textFieldProps
    },
    value,
    onChange: handleOnChange,
    formatGroupLabel: formatGroupLabel,
    selectWidth: width,
    options: items
  };

  if (creatable) {
    return <CreatableSelect<OptionType> {...common} />;
  }

  return <Select<OptionType> {...common} />;
}

const Component = withStyles(styles)(Autocomplete);
function Wrapper<OptionType>(
  props: Omit<IProps<OptionType>, 'classes'> & {
    classes?: Partial<WithStyles<typeof styles>['classes']>;
  }
) {
  const Moo = Component as React.ComponentType<typeof props>;
  return <Moo {...props} />;
}

export default Wrapper;
