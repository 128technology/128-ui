import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';

import CalendarHeaderButton from './CalendarHeaderButton';
import { VIEWS } from './constants';

function formatOrElse(cond, format, onElse) {
  return cond ? cond.format(format) : onElse;
}

class CalendarHeader extends React.Component {
  render() {
    const { classes, selectedView, selectViewOnClick, startDate, endDate } = this.props;

    return (
      <div className={classes.container}>
        <div className={classes.dateContainer}>
          <CalendarHeaderButton
            variant="subheading"
            selected={selectedView === VIEWS.START_YEAR}
            onClick={_.partialRight(selectViewOnClick, VIEWS.START_YEAR)}
          >
            {formatOrElse(startDate, 'YYYY', '')}
          </CalendarHeaderButton>
          <CalendarHeaderButton
            variant="headline"
            selected={selectedView === VIEWS.START_DATE}
            onClick={_.partialRight(selectViewOnClick, VIEWS.START_DATE)}
          >
            {formatOrElse(startDate, 'MMM DD', 'Start')}
          </CalendarHeaderButton>
          <CalendarHeaderButton
            variant="headline"
            className={classes.time}
            selected={selectedView === VIEWS.START_TIME}
            onClick={_.partialRight(selectViewOnClick, VIEWS.START_TIME)}
          >
            {formatOrElse(startDate, 'HH', '')}
            {startDate && <span className={classes.colon}>:</span>}
            {formatOrElse(startDate, 'mm', '')}
          </CalendarHeaderButton>
        </div>
        <div className={classes.dotsContainer}>
          <div className={classes.circle} />
          <i className="mdi mdi-dots-horizontal" />
          <div className={classes.circle} />
        </div>
        <div className={classNames(classes.dateContainer, classes.alignRight)}>
          <CalendarHeaderButton
            variant="subheading"
            selected={selectedView === VIEWS.END_YEAR}
            onClick={_.partialRight(selectViewOnClick, VIEWS.END_YEAR)}
          >
            {formatOrElse(endDate, 'YYYY', '')}
          </CalendarHeaderButton>
          <CalendarHeaderButton
            variant="headline"
            selected={selectedView === VIEWS.END_DATE}
            onClick={_.partialRight(selectViewOnClick, VIEWS.END_DATE)}
          >
            {formatOrElse(endDate, 'MMM DD', 'End')}
          </CalendarHeaderButton>
          <CalendarHeaderButton
            variant="headline"
            selected={selectedView === VIEWS.END_TIME}
            onClick={_.partialRight(selectViewOnClick, VIEWS.END_TIME)}
          >
            {formatOrElse(endDate, 'HH', '')}
            {endDate && <span className={classes.colon}>:</span>}
            {formatOrElse(endDate, 'mm', '')}
          </CalendarHeaderButton>
        </div>
      </div>
    );
  }
}

CalendarHeader.propTypes = {
  classes: PropTypes.object,
  selectedView: PropTypes.string,
  selectViewOnClick: PropTypes.func,
  startDate: PropTypes.instanceOf(moment),
  endDate: PropTypes.instanceOf(moment)
};

CalendarHeader.defaultProps = {
  classes: {},
  startDate: moment(),
  endDate: moment()
};

const enhance = withStyles(({ palette, spacing, shadows }) => ({
  container: {
    backgroundColor: palette.primary.main,
    padding: `${spacing.unit * 2}px ${spacing.unit * 2}px`,
    boxShadow: shadows[1],
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 122,
    boxSizing: 'border-box',
    zIndex: 10
  },
  dateContainer: {
    paddingLeft: spacing.unit,
    paddingRight: spacing.unit,
    flexGrow: 1,
    flexShrink: 0,
    width: '40%',
    boxSizing: 'border-box'
  },
  circle: {
    border: `2px solid ${palette.primary.light}`,
    height: 6,
    width: 6,
    margin: 3,
    borderRadius: '100%'
  },
  dotsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: palette.primary.light,
    fontSize: 20,
    flexShrink: 0,
    width: '20%'
  },
  colon: {
    marginLeft: spacing.unit * 0.35,
    marginRight: spacing.unit * 0.35,
    fontSize: 28
  },
  alignRight: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end'
  }
}));

export default enhance(CalendarHeader);
