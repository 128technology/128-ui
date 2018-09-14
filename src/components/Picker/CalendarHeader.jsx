import _ from 'lodash';
import React from 'react';
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
        <div className={classes.dateTimeContainer}>
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
              selected={selectedView === VIEWS.START_MONTH}
              onClick={_.partialRight(selectViewOnClick, VIEWS.START_MONTH)}
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
        </div>
        <div className={classes.dotsContainer}>
          <div className={classes.circle} />
          <i className="mdi mdi-dots-vertical" />
          <div className={classes.circle} />
        </div>
        <div className={classes.dateTimeContainer}>
          <div className={classes.dateContainer}>
            <CalendarHeaderButton
              variant="subheading"
              selected={selectedView === VIEWS.END_YEAR}
              onClick={_.partialRight(selectViewOnClick, VIEWS.END_YEAR)}
            >
              {formatOrElse(endDate, 'YYYY', '')}
            </CalendarHeaderButton>
            <CalendarHeaderButton
              variant="headline"
              selected={selectedView === VIEWS.END_MONTH}
              onClick={_.partialRight(selectViewOnClick, VIEWS.END_MONTH)}
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
      </div>
    );
  }
}

const enhance = withStyles(({ palette, spacing, shadows }) => ({
  container: {
    backgroundColor: palette.primary.main,
    padding: `${spacing.unit * 2}px ${spacing.unit * 2}px`,
    boxShadow: shadows[1],
    position: 'relative'
  },
  dateContainer: {
    paddingLeft: spacing.unit * 2,
    flexGrow: 1
  },
  circle: {
    border: `2px solid ${palette.primary.light}`,
    height: 6,
    width: 6,
    marginLeft: 5,
    borderRadius: '100%'
  },
  dateTimeContainer: {
    display: 'flex',
    alignItems: 'center',
    color: palette.primary.contrastText,
    '&:first-child': {
      paddingBottom: spacing.unit
    }
  },
  dotsContainer: {
    color: palette.primary.light,
    fontSize: 20,
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)'
  },
  monthTimeContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexGrow: 1,
    alignItems: 'center'
  },
  colon: {
    marginLeft: spacing.unit * 0.35,
    marginRight: spacing.unit * 0.35,
    fontSize: 28
  }
}));

export default enhance(CalendarHeader);
