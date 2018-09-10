import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import TextField from '@material-ui/core/TextField';
import DateTimePicker from 'material-ui-pickers/DateTimePicker/DateTimePicker';
import BasePicker from 'material-ui-pickers/_shared/BasePicker';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const atMidnight = date =>
  date
    .clone()
    .set('hour', 0)
    .set('minute', 0)
    .set('seconds', 0);

const isSameDay = (a, b) => a.date() === b.date() && a.month() === b.month() && a.year() === b.year();

class InlineDateTimeRangePicker extends React.Component {
  handleChange = (changeDate, idx) => (date, isFinished) => {
    const { onChange } = this.props;
    const valueCopy = idx === 0 ? [date, this.getRightPickerDate()] : [this.getLeftPickerDate(), date];

    changeDate(date, () => {
      if (isFinished) {
        onChange(valueCopy);
      }
    });
  };

  getLeftPickerDate = () => {
    if (this.leftPicker) {
      return this.leftPicker.props.date;
    }

    return moment();
  };

  getRightPickerDate = () => {
    if (this.rightPicker) {
      return this.rightPicker.props.date;
    }

    return moment();
  };

  renderDay = (date, selectedDate, dayInCurrentMonth, origComponent) => {
    const { classes } = this.props;
    const dateAtMidnight = date;
    const endDate = this.getRightPickerDate();
    const startDate = this.getLeftPickerDate();

    const highlightClasses = classNames(
      {
        [classes.betweenDate]: dayInCurrentMonth && dateAtMidnight > startDate && dateAtMidnight < endDate,
        [classes.startDate]:
          dayInCurrentMonth && isSameDay(dateAtMidnight, startDate) && !isSameDay(startDate, endDate),
        [classes.endDate]: dayInCurrentMonth && isSameDay(dateAtMidnight, endDate) && !isSameDay(startDate, endDate)
      },
      classes.highlight
    );

    return (
      <div className={classes.dayContainer}>
        <span className={highlightClasses} />
        {origComponent}
      </div>
    );
  };

  render() {
    const {
      value,
      openTo,
      minDate,
      maxDate,
      showTabs,
      autoSubmit,
      disablePast,
      disableFuture,
      leftArrowIcon,
      rightArrowIcon,
      dateRangeIcon,
      timeIcon,
      ampm,
      shouldDisableDate,
      animateYearScrolling,
      allowKeyboardControl,
      classes
    } = this.props;

    const [startDate, endDate] = value;

    return (
      <div>
        <TextField />
        <Paper elevation={1} className={classes.paper}>
          <div className={classes.calendarContainer}>
            <BasePicker {...this.props} value={startDate} autoOk={true}>
              {({ date, changeDate }) => (
                <DateTimePicker
                  ref={el => (this.leftPicker = el)}
                  allowKeyboardControl={allowKeyboardControl}
                  ampm={ampm}
                  animateYearScrolling={animateYearScrolling}
                  autoSubmit={autoSubmit}
                  date={date}
                  dateRangeIcon={dateRangeIcon}
                  disableFuture={disableFuture}
                  disablePast={disablePast}
                  leftArrowIcon={leftArrowIcon}
                  maxDate={maxDate}
                  minDate={minDate}
                  onChange={this.handleChange(changeDate, 0)}
                  openTo={openTo}
                  renderDay={this.renderDay}
                  rightArrowIcon={rightArrowIcon}
                  shouldDisableDate={shouldDisableDate}
                  showTabs={showTabs}
                  timeIcon={timeIcon}
                />
              )}
            </BasePicker>
          </div>
          <div className={classes.calendarContainer}>
            <BasePicker {...this.props} value={endDate} autoOk={true}>
              {({ date, changeDate }) => (
                <DateTimePicker
                  ref={el => (this.rightPicker = el)}
                  allowKeyboardControl={allowKeyboardControl}
                  ampm={ampm}
                  animateYearScrolling={animateYearScrolling}
                  autoSubmit={autoSubmit}
                  date={date}
                  dateRangeIcon={dateRangeIcon}
                  disableFuture={disableFuture}
                  disablePast={disablePast}
                  leftArrowIcon={leftArrowIcon}
                  maxDate={maxDate}
                  minDate={minDate}
                  onChange={this.handleChange(changeDate, 1)}
                  openTo={openTo}
                  renderDay={this.renderDay}
                  rightArrowIcon={rightArrowIcon}
                  shouldDisableDate={shouldDisableDate}
                  showTabs={showTabs}
                  timeIcon={timeIcon}
                />
              )}
            </BasePicker>
          </div>
        </Paper>
      </div>
    );
  }
}

InlineDateTimeRangePicker.propTypes = {
  value: PropTypes.array,
  format: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  autoOk: PropTypes.bool,
  autoSubmit: PropTypes.bool,
  disableFuture: PropTypes.bool,
  disablePast: PropTypes.bool,
  minDate: PropTypes.any,
  maxDate: PropTypes.any,
  showTabs: PropTypes.bool,
  leftArrowIcon: PropTypes.node,
  rightArrowIcon: PropTypes.node,
  dateRangeIcon: PropTypes.node,
  timeIcon: PropTypes.node,
  ampm: PropTypes.bool,
  shouldDisableDate: PropTypes.func,
  animateYearScrolling: PropTypes.bool,
  openTo: PropTypes.oneOf(['year', 'date', 'hour', 'minutes']),
  allowKeyboardControl: PropTypes.bool,
  forwardedRef: PropTypes.func
};

InlineDateTimeRangePicker.defaultProps = {
  value: [new Date(), new Date()],
  format: undefined,
  autoOk: false,
  autoSubmit: true,
  openTo: 'date',
  disableFuture: false,
  disablePast: false,
  minDate: '1900-01-01',
  maxDate: '2100-01-01',
  showTabs: true,
  leftArrowIcon: 'keyboard_arrow_left',
  rightArrowIcon: 'keyboard_arrow_right',
  dateRangeIcon: 'date_range',
  timeIcon: 'access_time',
  ampm: true,
  shouldDisableDate: undefined,
  animateYearScrolling: false,
  forwardedRef: undefined,
  allowKeyboardControl: true
};

const enhance = withStyles(({ palette }) => ({
  paper: {
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center'
  },
  calendarContainer: {
    flexGrow: 1,
    overflow: 'hidden'
  },
  dayContainer: {
    position: 'relative'
  },
  highlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  startDate: {
    backgroundColor: palette.primary.light,
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
    left: 2
  },
  endDate: {
    backgroundColor: palette.primary.light,
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
    right: 2
  },
  betweenDate: {
    backgroundColor: palette.primary.light
  }
}));

export default enhance(InlineDateTimeRangePicker);
