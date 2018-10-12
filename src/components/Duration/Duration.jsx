import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';

import './Duration.scss';

const msTimeMap = {
  years: 31536000000,
  days: 86400000,
  hours: 3600000,
  minutes: 60000,
  seconds: 1000
};

/**
 * Utility component for displaying durations of time in the format:
 * {days}d {hours}h {minutes}m {seconds}s.
 */
class Duration extends React.Component {
  getDurationString(ms) {
    if (_.isNil(ms) || !_.isNumber(ms)) {
      return '';
    }

    if (ms <= 0) {
      return '0d 0h 0m 0s';
    }

    const duration = Object.keys(msTimeMap).reduce(
      (acc, timeUnit) => {
        acc[timeUnit] = Math.floor(acc.remainingTime / msTimeMap[timeUnit]);
        acc.remainingTime -= acc[timeUnit] * msTimeMap[timeUnit];
        return acc;
      },
      { remainingTime: ms }
    );

    return `${duration.years > 0
      ? `${duration.years}y `
      : ''}${duration.days}d ${duration.hours}h ${duration.minutes}m ${duration.seconds}s`;
  }

  render() {
    const { duration, className, ...otherProps } = this.props;
    const durationString = this.getDurationString(duration);

    return (
      <span {...otherProps} className={classNames(className, 'ui-128__duration', 'ui-128')}>
        {durationString}
      </span>
    );
  }
}

Duration.propTypes = {
  /**
   * A duration of time in milliseconds.
   */
  duration: PropTypes.number
};

export default Duration;
