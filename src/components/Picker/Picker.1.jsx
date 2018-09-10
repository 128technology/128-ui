import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker, DateTimePicker, TimePicker } from 'material-ui-pickers';
import { InlineTimePicker } from 'material-ui-pickers/TimePicker';
import { InlineDatePicker } from 'material-ui-pickers/DatePicker';
import { InlineDateTimePicker } from 'material-ui-pickers/DateTimePicker';

import InlineDateTimeRangePicker from './InlineDateTimeRangePicker';

class Picker extends React.Component {
  constructor(props) {
    super(props);
    if (props.range) {
      this.state = { selected: [new Date(), new Date()] };
    } else {
      this.state = { selected: new Date() };
    }
  }

  handleOnChange = date => {
    const { range } = this.props;

    if (range) {
      this.setState({ selected: date.map(d => d.toDate()) });
    } else {
      this.setState({ selected: date.toDate() });
    }
  };

  getPicker() {
    const { variant, inline, range } = this.props;

    if (range) {
      return InlineDateTimeRangePicker;
    }

    switch (variant) {
      case 'dateTime':
        if (inline) {
          return InlineDateTimePicker;
        }

        return DateTimePicker;
      case 'time':
        if (inline) {
          return InlineTimePicker;
        }

        return TimePicker;
      default:
        if (inline) {
          return InlineDatePicker;
        }

        return DatePicker;
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

    return (
      <PickerComponent
        {...this.getPickerProps()}
        onChange={this.handleOnChange}
        value={this.props.value || this.state.selected}
      />
    );
  }
}

Picker.propTypes = {
  /**
   * When true, transforms the Picker component into a Range Picker.
   * Only an inline version of the date time picker is currently available
   */
  range: PropTypes.bool,
  variant: PropTypes.oneOf(['dateTime', 'time', 'date']),
  onChange: PropTypes.func
};

Picker.defaultProps = {
  range: false,
  onChange: _.noop,
  variant: 'date'
};

export default Picker;
