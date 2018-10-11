import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Select from 'react-select';
import AsyncCreatableSelect from 'react-select/lib/AsyncCreatable';
import CreatableSelect from 'react-select/lib/Creatable';
import AsyncSelect from 'react-select/lib/Async';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import TetherComponent from 'react-tether';
import classNames from 'classnames';
import { List } from 'react-virtualized';
import { withStyles } from '@material-ui/core/styles';

function InputComponent({ inputRef, ...rest }) {
  return <div ref={inputRef} {...rest} />;
}

function NoOptionsMessage({ children, selectProps, innerProps }) {
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

function Control({ selectProps, innerRef, innerProps, children }) {
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
          underline: classNames(inputPropsClasses.underline, selectProps.classes.inputUnderline),
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

function Option(props) {
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

function Placeholder({ selectProps, innerProps, children }) {
  return (
    <Typography color="textSecondary" className={selectProps.classes.placeholder} {...innerProps}>
      {children}
    </Typography>
  );
}

function ValueContainer({ selectProps, children }) {
  return <div className={selectProps.classes.valueContainer}>{children}</div>;
}

function MultiValue({ children, selectProps, isFocused, removeProps }) {
  return (
    <Chip
      tabIndex={-1}
      label={children}
      className={classNames(selectProps.classes.chip, {
        [selectProps.classes.chipFocused]: isFocused
      })}
      onDelete={event => {
        removeProps.onClick();
        removeProps.onMouseDown(event);
      }}
    />
  );
}

function MenuList({ selectProps, children }) {
  const rowCount = children && _.isNumber(children.length) ? children.length : 1;
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

function Menu({ selectProps, children, innerProps }) {
  return (
    <TetherComponent
      attachment="top center"
      constraints={[
        {
          to: 'window',
          attachment: 'together'
        }
      ]}
      style={{ zIndex: 1500 }}
    >
      <div />
      <Paper
        elevation={1}
        className={selectProps.classes.paper}
        style={{ maxWidth: selectProps.selectWidth, width: selectProps.selectWidth || 'auto' }}
        {...innerProps}
      >
        {children}
      </Paper>
    </TetherComponent>
  );
}

function formatGroupLabel(data) {
  return (
    <Typography color="textSecondary" variant="subheading">
      {data.label}
    </Typography>
  );
}

class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.el = null;
    this.state = { selection: null, width: null };
  }

  componentDidMount() {
    this.setWidth();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  setWidth() {
    const node = ReactDOM.findDOMNode(this.el);
    this.setState({ width: node.clientWidth });
  }

  handleResize = () => {
    this.setWidth();
  };

  handleOnChange = (newSelection, ...args) => {
    const { onChange, selection } = this.props;

    if (onChange) {
      onChange(newSelection, ...args);
    }

    if (!selection) {
      this.setState({ selection: newSelection });
    }
  };

  filterOptions = inputVal => options =>
    options.filter(x =>
      this.props.accessors
        .label(x)
        .toLowerCase()
        .includes(inputVal.toLowerCase())
    );

  getSelection() {
    const { selection } = this.props;

    if (_.isString(selection)) {
      return { label: selection, value: selection };
    }

    if (selection !== undefined) {
      return selection;
    }

    return this.state.selection;
  }

  getOptions() {
    const { options, groupBy } = this.props;

    if (groupBy) {
      const groups = _.groupBy(options, groupBy);
      return _.map(groups, (x, k) => ({
        label: k,
        options: x
      }));
    }

    return options;
  }

  getSelectComponentType() {
    const { creatable, async } = this.props;

    if (creatable && async) {
      return AsyncCreatableSelect;
    }

    if (creatable) {
      return CreatableSelect;
    }

    if (async) {
      return AsyncSelect;
    }

    return Select;
  }

  loadOptions() {
    const { loadOptions } = this.props;

    if (_.isFunction(loadOptions)) {
      if (loadOptions.length === 0) {
        return inputVal => loadOptions().then(this.filterOptions(inputVal));
      }

      if (loadOptions.length >= 1) {
        return (inputVal, cb) => loadOptions(_.flow(this.filterOptions(inputVal), cb));
      }
    }

    return null;
  }

  render() {
    const { width } = this.state;
    const { classes, async, accessors, errorText, groupBy, textFieldProps, ...rest } = this.props;
    const SelectComponent = this.getSelectComponentType();
    const virtualized = groupBy ? {} : { MenuList };

    return (
      <SelectComponent
        {...rest}
        ref={el => (this.el = el)}
        classes={classes}
        components={{
          ...virtualized,
          Control,
          Menu,
          MultiValue,
          NoOptionsMessage,
          Option,
          Placeholder,
          ValueContainer
        }}
        textFieldProps={{
          label: '',
          InputLabelProps: {
            shrink: true
          },
          error: Boolean(errorText),
          helperText: errorText,
          ...textFieldProps
        }}
        options={!async ? this.getOptions() : undefined}
        loadOptions={async ? this.loadOptions() : undefined}
        value={this.getSelection()}
        onChange={this.handleOnChange}
        formatGroupLabel={formatGroupLabel}
        selectWidth={width}
        getOptionLabel={accessors.label}
        getOptionValue={accessors.value}
      />
    );
  }
}

Autocomplete.propTypes = {
  accessors: PropTypes.object,
  options: PropTypes.array,
  groupBy: PropTypes.func,
  creatable: PropTypes.bool,
  async: PropTypes.bool,
  loadOptions: PropTypes.func,
  selection: PropTypes.any,
  optionRenderer: PropTypes.func,
  errorText: PropTypes.string,
  rowHeight: PropTypes.number,
  visibleRows: PropTypes.number,
  textFieldProps: PropTypes.object
};

Autocomplete.defaultProps = {
  accessors: {},
  options: [],
  groupBy: null,
  creatable: false,
  async: false,
  loadOptions: null,
  rowHeight: 48,
  visibleRows: 5,
  textFieldProps: {}
};

const enhance = withStyles(({ spacing, palette }) => ({
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
      borderBottom: '1px solid rgba(224, 224, 224) !important'
    }
  }
}));

export default enhance(Autocomplete);
