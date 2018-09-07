import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker, DateTimePicker, TimePicker } from 'material-ui-pickers';
import { InlineTimePicker } from 'material-ui-pickers/TimePicker';
import { InlineDatePicker } from 'material-ui-pickers/DatePicker';
import { InlineDateTimePicker } from 'material-ui-pickers/DateTimePicker';

class Picker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: new Date() };
  }

  handleOnChange = date => {
    this.setState({ selected: date.toDate() });
  };

  getPicker() {
    const { variant, inline } = this.props;

    switch (variant) {
      case 'dateTime':
        return inline ? InlineDateTimePicker : DateTimePicker;
      case 'time':
        return inline ? InlineTimePicker : TimePicker;
      default:
        return inline ? InlineDatePicker : DatePicker;
    }
  }

  getPickerProps() {
    const { variant } = this.props;

    switch (variant) {
      case 'date':
        return {
          leftArrowIcon: <i className="mdi mdi-chevron-left" />,
          rightArrowIcon: <i className="mdi mdi-chevron-right" />
        };
      case 'dateTime':
        return {
          leftArrowIcon: <i className="mdi mdi-chevron-left" />,
          rightArrowIcon: <i className="mdi mdi-chevron-right" />,
          timeIcon: <i className="mdi mdi-clock-outline" />,
          dateRangeIcon: <i className="mdi mdi-calendar-range" />
        };
      case 'time':
        return {};
      default:
        return {};
    }
  }

  render() {
    const PickerComponent = this.getPicker();

    return <PickerComponent {...this.getPickerProps()} onChange={this.handleOnChange} value={this.state.selected} />;
  }
}

Picker.propTypes = {
  /**
   * When true, transforms the Picker component into a Range Picker.
   */
  rangePicker: PropTypes.bool,
  variant: PropTypes.oneOf(['dateTime', 'time', 'date']),
  onChange: PropTypes.func
};

Picker.defaultProps = {
  rangePicker: false,
  onChange: _.noop,
  variant: 'date'
};

export default Picker;
