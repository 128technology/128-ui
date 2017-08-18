import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';

import './Duration.scss';

/**
 * Utility component for displaying durations of time in the format:
 * {days}d {hours}h {minutes}m {seconds}s.
 */
class Duration extends React.Component {
  getDurationString(ms) {
    if (_.isNil(ms) || !_.isNumber(ms)) {
      return '';
    }

    const years = Math.floor(ms / 31536000000);
    const days = Math.floor(ms / 86400000) - years * 365;
    const hours = Math.floor(ms / 3600000) - days * 24 - years * 365 * 24;
    const minutes = Math.floor(ms / 60000) - hours * 60 - days * 24 * 60 - years * 365 * 24 * 60;
    const seconds = Math.floor(ms / 1000) - minutes * 60 - hours * 3600 - days * 24 * 3600 - years * 365 * 24 * 3600;

    return `${years > 0 ? `${years}y ` : ''}${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  render() {
    const { duration, className = '', ...otherProps } = this.props;
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
