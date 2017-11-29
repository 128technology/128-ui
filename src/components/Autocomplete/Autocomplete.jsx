import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import VirtualizedSelect from 'react-virtualized-select';
import TetherComponent from 'react-tether';
import Select, { Creatable } from 'react-select';
import classNames from 'classnames';

import './Autocomplete.scss';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';

const DEFAULT_CLASS = 'ui-128__autocomplete';
const ERROR_CLASS = 'ui-128__autocomplete--error';

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
      <TetherComponent
        renderElementTo="body"
        ref="tethered-component"
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
        <div />
        {React.cloneElement(menu, { style: { position: 'static', width: selectWidth } })}
      </TetherComponent>
    );
  }
}

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

    if (this.props.onSelect) {
      this.props.onSelect.call(this, newValue);
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
    const { id, className, value, onSelect, errorText, clearable, creatable, ...rest } = this.props;

    const classes = this._buildClass(className);

    const errorTextComponent = !_.isNil(errorText) ? (
      <div className="ui-128__autocomplete--error-text">{errorText}</div>
    ) : null;

    const selectComponent = creatable ? Creatable : TetheredSelect;

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
  onSelect: PropTypes.func,
  /**
   * Error text shown below the select input
   */
  errorText: PropTypes.string
};

export default Autocomplete;
