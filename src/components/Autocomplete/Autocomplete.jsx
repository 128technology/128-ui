import _ from 'lodash';
import React from 'react';
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
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

function InputComponent({ inputRef, ...rest }) {
  return <div ref={inputRef} {...rest} />;
}

function NoOptionsMessage({ children, selectProps, innerProps }) {
  return (
    <Typography color="textSecondary" className={selectProps.classes.noOptionsMessage} {...innerProps}>
      {children}
    </Typography>
  );
}

function Control({ selectProps, innerRef, innerProps, children }) {
  return (
    <TextField
      fullWidth={true}
      InputProps={{
        inputComponent: InputComponent,
        inputProps: {
          className: selectProps.classes.input,
          inputRef: innerRef,
          children: children,
          ...innerProps
        }
      }}
      {...selectProps.textFieldProps}
    />
  );
}

function Option({ innerRef, isFocused, innerProps, children }) {
  return (
    <MenuItem buttonRef={innerRef} selected={isFocused} component="div" {...innerProps}>
      {children}
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

function Menu({ selectProps, children, innerProps }) {
  return (
    <Paper elevation={1} className={selectProps.classes.paper} {...innerProps}>
      {children}
    </Paper>
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
    this.state = { selection: null };
  }

  handleOnChange = (newSelection, ...args) => {
    const { onChange, selection } = this.props;

    if (onChange) {
      onChange(newSelection, ...args);
    }

    if (!selection) {
      this.setState({ selection: newSelection });
    }
  };

  mapOptions = options => {
    const { accessors } = this.props;

    return options.map(x => ({
      value: accessors.value(x),
      label: accessors.label(x)
    }));
  };

  filterOptions = inputVal => options => options.filter(x => x.label.toLowerCase().includes(inputVal.toLowerCase()));

  getOptions() {
    const { options, groupBy } = this.props;

    if (groupBy) {
      const groups = _.groupBy(options, groupBy);
      return _.map(groups, (x, k) => ({
        label: k,
        options: this.mapOptions(x)
      }));
    }

    return this.mapOptions(options);
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
        return inputVal => loadOptions().then(_.flow(this.mapOptions, this.filterOptions(inputVal)));
      }

      if (loadOptions.length >= 1) {
        return (inputVal, cb) => loadOptions(_.flow(this.mapOptions, this.filterOptions(inputVal), cb));
      }
    }

    return null;
  }

  render() {
    const { classes, async, selection, ...rest } = this.props;
    const SelectComponent = this.getSelectComponentType();

    return (
      <SelectComponent
        {...rest}
        classes={classes}
        components={{
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
          }
        }}
        options={!async ? this.getOptions() : undefined}
        loadOptions={async ? this.loadOptions() : undefined}
        value={selection || this.state.selection}
        onChange={this.handleOnChange}
        formatGroupLabel={formatGroupLabel}
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
  selection: PropTypes.any
};

Autocomplete.defaultProps = {
  accessors: {
    value: d => d.value,
    label: d => d.label
  },
  options: [],
  groupBy: null,
  creatable: false,
  async: false,
  loadOptions: null,
  selection: null
};

const enhance = withStyles(({ spacing, palette }) => ({
  input: {
    display: 'flex',
    padding: 0
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
  }
}));

export default enhance(Autocomplete);
