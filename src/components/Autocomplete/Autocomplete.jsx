import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import VirtualizedSelect from 'react-virtualized-select';
import TetherComponent from 'react-tether';
import Select, { AsyncCreatable, Creatable } from 'react-select';
import classNames from 'classnames';

import './Autocomplete.scss';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';

const DEFAULT_CLASS = 'ui-128__autocomplete';
const ERROR_CLASS = 'ui-128__autocomplete--error';

const Tethered = ({ children }) => {
  return (
    <TetherComponent
      renderElementTo="body"
      attachment="top left"
      targetAttachment="top left"
      className="ui-128__autocomplete--options"
      constraints={[
        {
          to: 'window',
          attachment: 'together',
          pin: ['top']
        }
      ]}
    >
      {children}
    </TetherComponent>
  );
};

/**
 * This is a custom version of the react-select component
 * that will allow the options menu to overflow and be visible
 * in containers that have overflow: hidden, scroll, etc.
 *
 * https://github.com/JedWatson/react-select/issues/810#issuecomment-284573308
 */
class TetheredSelect extends Select {
  constructor(props) {
    super(props);

    this.renderOuter = this._renderOuter;
  }

  _renderOuter() {
    const menu = super.renderOuter.apply(this, arguments);

    if (!menu) {
      return undefined;
    }

    const selectWidth = this.wrapper ? this.wrapper.offsetWidth : null;

    return (
      <Tethered>
        <div />
        {React.cloneElement(menu, { style: { position: 'static', width: selectWidth } })}
      </Tethered>
    );
  }
}

/**
 * This is a custom version of the react-select component,
 * specifically when creatable options are allowed,
 * that will allow the options menu to overflow and be visible
 * in containers that have overflow: hidden, scroll, etc.
 *
 * https://github.com/JedWatson/react-select/issues/810#issuecomment-284573308
 */
const TetheredCreatable = props => {
  return (
    <Tethered>
      <Creatable {...props}>{creatableProps => <TetheredSelect {...creatableProps} />}</Creatable>
    </Tethered>
  );
};

/**
 * This is a custom version of the react-select component,
 * specifically when asynchronous creatable options are allowed,
 * that will allow the options menu to overflow and be visible
 * in containers that have overflow: hidden, scroll, etc.
 *
 * https://github.com/JedWatson/react-select/issues/810#issuecomment-284573308
 */
const TetheredAsyncCreatable = props => {
  return (
    <Tethered>
      <AsyncCreatable {...props}>{creatableProps => <TetheredSelect {...creatableProps} />}</AsyncCreatable>
    </Tethered>
  );
};

/**
 * This component is essentially a text field combined with
 * a dropdown menu. The user can type into the field and will
 * be presented with a list of matching options.
 */
class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectValue: props.value };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(selected) {
    const newValue = _.get(selected, 'value', null);
    if (this.props.onChange) {
      this.props.onChange.call(this, newValue);
    }

    this.setState({ selectValue: newValue });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({ selectValue: nextProps.value });
    }
  }

  _buildClass(className) {
    const { errorText } = this.props;
    const classes = [DEFAULT_CLASS];

    if (className) {
      classes.push(className);
    }

    if (errorText) {
      classes.push(ERROR_CLASS);
    }

    return classNames(classes);
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { id, className, value, onChange, errorText, clearable, creatable, async, ...rest } = this.props;

    const classes = this._buildClass(className);

    const errorTextComponent = !_.isNil(errorText) ? (
      <div className="ui-128__autocomplete--error-text">{errorText}</div>
    ) : null;

    const selectComponent = creatable ? (async ? TetheredAsyncCreatable : TetheredCreatable) : TetheredSelect;
    return (
      <div id={id} className={classes}>
        <VirtualizedSelect
          value={this.state.selectValue}
          onChange={this.handleChange}
          ignoreCase={true}
          ignoreAccents={false}
          clearable={clearable}
          autosize={true}
          selectComponent={selectComponent}
          onSelectResetsInput={!creatable}
          onBlurResetsInput={!creatable}
          onCloseResetsInput={!creatable}
          {...rest}
        />
        {errorTextComponent}
      </div>
    );
  }
}

Autocomplete.defaultProps = {
  errorText: null,
  clearable: false,
  promptTextCreator: label => `Add "${label}"`
};

Autocomplete.propTypes = {
  id: PropTypes.string,
  /**
   * Class name to append to the root element
   */
  className: PropTypes.string,
  initialValue: PropTypes.any,
  placeholder: PropTypes.oneOfType([
    // displayed when there's no value
    PropTypes.string,
    PropTypes.node
  ]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.node
    })
  ),
  /**
   * function that accepts: { focusedOption, focusedOptionIndex, focusOption, key,
   * labelKey, option, optionIndex, options, selectValue, style, valueArray })
   * and returns an element
   */
  optionRenderer: PropTypes.func,
  /**
   * function that accepts selected value
   */
  onChange: PropTypes.func,
  /**
   * Error text shown below the select input
   */
  errorText: PropTypes.string,
  /**
   * Allow the user to add new options on the fly
   */
  creatable: PropTypes.bool,
  /**
   * Allow options to be loaded asynchronously
   */
  async: PropTypes.bool,
  /**
   * function that accepts a raw label and returns a descriptive label
   */
  promptTextCreator: PropTypes.func
};

export default Autocomplete;
