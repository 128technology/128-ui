import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';

import PickerList from './PickerList';

function getHourRange() {
  const now = moment().startOf('day');
  return _.range(0, 24).map(x => now.clone().add(x, 'hour'));
}

function getMinuteRange() {
  const now = moment().startOf('hour');
  return _.range(0, 60).map(x => now.clone().add(x, 'minute'));
}

class TimePicker extends React.Component {
  render() {
    const { classes, date, minuteOnClick, hourOnClick, hourFormat, minuteFormat } = this.props;
    const hourRange = getHourRange();
    const minuteRange = getMinuteRange();

    return (
      <div className={classes.container}>
        <PickerList
          className={classes.list}
          selected={d => d.hour() === date.hour()}
          itemOnClick={hourOnClick}
          data={hourRange}
          format={hourFormat}
        />
        <PickerList
          className={classes.list}
          selected={d => d.minute() === date.minute()}
          itemOnClick={minuteOnClick}
          data={minuteRange}
          format={minuteFormat}
        />
      </div>
    );
  }
}

TimePicker.propTypes = {
  classes: PropTypes.object,
  date: PropTypes.instanceOf(moment),
  minuteOnClick: PropTypes.func,
  hourOnClick: PropTypes.func,
  hourFormat: PropTypes.string,
  minuteFormat: PropTypes.string
};

TimePicker.defaultProps = {
  date: moment(),
  minuteOnClick: _.noop,
  hourOnClick: _.noop,
  hourFormat: 'HH',
  minuteFormat: 'mm'
};

const enhance = withStyles(({ spacing }) => ({
  container: {
    display: 'flex'
  },
  list: {
    width: '50%',
    boxSizing: 'border-box'
  }
}));

export default enhance(TimePicker);
