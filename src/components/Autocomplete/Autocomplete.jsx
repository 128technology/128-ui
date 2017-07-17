import React from 'react';
import VirtualizedSelect from 'react-virtualized-select';
import TetherComponent from 'react-tether';
import Select from 'react-select';

import './Autocomplete.scss';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';

const DEFAULT_CLASS = 'ui-128__autocomplete';

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
        constraints={[{
          to: 'window',
          attachment: 'together',
          pin: ['top']
        }]}
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
    this._handleChange = this._handleChange.bind(this);
  }

  _handleChange(selected) {
    const newValue = selected.value;
    this.props.onSelect && this.props.onSelect.call(this, newValue);
    this.setState({ selectValue: newValue });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({selectValue: nextProps.value});
    }
  }

  _buildClass(className) {
    if (className) {
      const classes = [DEFAULT_CLASS];
      classes.push(className);
      return classes.join(' ');
    } else {
      return DEFAULT_CLASS;
    }
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { className, value, onSelect, ...rest} = this.props;

    const classes = this._buildClass(className);

    return (
        <VirtualizedSelect
          value={this.state.selectValue}
          onChange={this._handleChange}
          ignoreCase={true}
          ignoreAccents={false}
          clearable={false}
          className={classes}
          autosize={true}
          selectComponent={TetheredSelect}
          {...rest}
        />
    );
  }
}

Autocomplete.propTypes = {
  /**
   * Class name to append to the root element
   */
  className: React.PropTypes.string,
  initialValue: React.PropTypes.any,
  placeholder: React.PropTypes.oneOfType([ // displayed when there's no value
    React.PropTypes.string,
    React.PropTypes.node
  ]),
  options: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      label: React.PropTypes.string,
      value: React.PropTypes.node
    })
  ),
  /**
   * function that accepts: { focusedOption, focusedOptionIndex, focusOption, key,
   * labelKey, option, optionIndex, options, selectValue, style, valueArray })
   * and returns an element
   */
  optionRenderer: React.PropTypes.func,
  /**
   * function that accepts selected value
   */
  onSelect: React.PropTypes.func
};

export default Autocomplete;
