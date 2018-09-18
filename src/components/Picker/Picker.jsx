import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';

import CalendarController from './CalendarController';
import CalendarDay from './CalendarDay';
import CalendarHeader from './CalendarHeader';
import YearPicker from './YearPicker';
import TimePicker from './TimePicker';
import * as stateHandlers from './stateHandlers';
import Calendar from '../Calendar';
import { VIEWS } from './constants';

class Picker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleDate: moment(),
      selectedView: VIEWS.START_DATE,
      startDate: props.defaultStartDate,
      endDate: props.defaultEndDate,
      hoveredDate: null,
      open: false,
      anchorEl: null
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.startDate !== this.state.startDate || prevState.endDate !== this.state.endDate) {
      this.handlePickerOnChange();
    }
  }

  handlePickerOnChange() {
    const { onChange } = this.props;
    const startDate = this.getStartDate();
    const endDate = this.getEndDate();

    if (onChange) {
      onChange(startDate, endDate);
    }
  }

  handleSelectViewOnClick = (e, view) => {
    const { viewOnClick } = this.props;

    if (viewOnClick) {
      viewOnClick(e, view);
    }

    this.setState(stateHandlers.selectView(view));
  };

  handleYearOnClick = (e, date) => {
    const { yearOnClick } = this.props;

    if (yearOnClick) {
      yearOnClick(e, date);
    }

    this.setState(stateHandlers.selectYear(date));
    this.setState(stateHandlers.sortDates);
  };

  handleHourOnClick = (e, date) => {
    const { hourOnClick } = this.props;

    if (hourOnClick) {
      hourOnClick(e, date);
    }

    this.setState(stateHandlers.selectHour(date));
    this.setState(stateHandlers.sortDates);
  };

  handleMinuteOnClick = (e, date) => {
    const { minuteOnClick } = this.props;

    if (minuteOnClick) {
      minuteOnClick(e, date);
    }

    this.setState(stateHandlers.selectMinute(date));
    this.setState(stateHandlers.sortDates);
  };

  handleDayOnClick = (e, date) => {
    const { dayOnClick } = this.props;

    if (dayOnClick) {
      dayOnClick(e, date);
    }

    this.setState(stateHandlers.selectDate(date));
    this.setState(stateHandlers.sortDates);
  };

  handleDayOnMouseEnter = (e, date) => {
    const { dayOnMouseEnter } = this.props;

    if (dayOnMouseEnter) {
      dayOnMouseEnter(e, date);
    }

    this.setState(stateHandlers.hoverDate(date));
    this.setState(stateHandlers.sortHoverDatesAndView);
  };

  handleOnMouseLeave = () => {
    const { dayOnMouseLeave } = this.props;

    if (dayOnMouseLeave) {
      dayOnMouseLeave();
    }

    this.setState(stateHandlers.clearHoverDate);
  };

  handleTextFieldFocus = e => {
    const { textFieldOnFocus } = this.props;

    if (textFieldOnFocus) {
      textFieldOnFocus(e);
    }

    this.setState(stateHandlers.openPopover(e.currentTarget));
  };

  handlePopoverOnClose = () => {
    const { popoverOnClose } = this.props;

    if (popoverOnClose) {
      popoverOnClose();
    }

    this.setState(stateHandlers.closePopover);
  };

  handlePrevMonthOnClick = e => {
    const { prevMonthOnClick } = this.props;

    if (prevMonthOnClick) {
      prevMonthOnClick(e);
    } else {
      this.setState(stateHandlers.decrementVisibleMonth);
    }
  };

  handleNextMonthOnClick = e => {
    const { nextMonthOnClick } = this.props;

    if (nextMonthOnClick) {
      nextMonthOnClick(e);
    } else {
      this.setState(stateHandlers.incrementVisibleMonth);
    }
  };

  selectDay = date => {
    const startDate = this.getVisibleStartDate();
    const endDate = this.getVisibleEndDate();
    return date.isSame(startDate, 'day') || date.isSame(endDate, 'day');
  };

  getStartDate = () => {
    const startDate = this.props.startDate || this.state.startDate;
    return startDate ? startDate.clone() : startDate;
  };

  getEndDate = () => {
    const endDate = this.props.endDate || this.state.endDate;
    return endDate ? endDate.clone() : endDate;
  };

  getVisibleStartDate = () => {
    const { selectedView } = this.state;
    const startDate = this.getStartDate();
    return selectedView === VIEWS.START_DATE && !startDate ? this.getHoveredDate() : startDate;
  };

  getVisibleEndDate = () => {
    const { selectedView } = this.state;
    const endDate = this.getEndDate();
    return selectedView === VIEWS.END_DATE && !endDate ? this.getHoveredDate() : endDate;
  };

  getHoveredDate = () => {
    const hoveredDate = this.props.hoveredDate || this.state.hoveredDate;
    return hoveredDate ? hoveredDate.clone() : hoveredDate;
  };

  getFormattedDateRange = () => {
    const startDate = this.getStartDate();
    const endDate = this.getEndDate();
    const startText = startDate ? startDate.format('YYYY/MM/d HH:mm') : 'Start';
    const endText = endDate ? endDate.format('YYYY/MM/d HH:mm') : 'End';
    return `${startText} - ${endText}`;
  };

  getVisibleDate = () => this.props.visibleDate || this.state.visibleDate;

  getSelectedView = () => this.props.selectedView || this.state.selectedView;

  isPopoverOpen() {
    return this.props.open === true || this.state.open === true;
  }

  dayRenderer = (date, dayProps, symbol) => {
    const startDate = this.getVisibleStartDate();
    const endDate = this.getVisibleEndDate();

    return (
      <CalendarDay
        date={date}
        dayProps={dayProps}
        startDate={startDate}
        endDate={endDate}
        onClick={this.handleDayOnClick}
        onMouseEnter={this.handleDayOnMouseEnter}
      >
        {symbol}
      </CalendarDay>
    );
  };

  disableDay = (d, inCurrentMonth) => !inCurrentMonth;

  render() {
    const { anchorEl } = this.state;
    const { classes, minDate, maxDate } = this.props;
    const startDate = this.getVisibleStartDate();
    const endDate = this.getVisibleEndDate();
    const visibleDate = this.getVisibleDate();
    const selectedView = this.getSelectedView();

    return (
      <div className={classes.calendar}>
        <TextField onFocus={this.handleTextFieldFocus} value={this.getFormattedDateRange()} />
        <Popover
          open={this.isPopoverOpen()}
          onClose={this.handlePopoverOnClose}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
        >
          <Paper elevation={1} className={classes.contentContainer}>
            <CalendarHeader
              selectedView={selectedView}
              selectViewOnClick={this.handleSelectViewOnClick}
              startDate={startDate}
              endDate={endDate}
            />
            {(selectedView === VIEWS.START_DATE || selectedView === VIEWS.END_DATE) && (
              <div className={classes.calendarContainer} onMouseLeave={this.handleOnMouseLeave}>
                <CalendarController
                  date={visibleDate}
                  nextMonthOnClick={this.handleNextMonthOnClick}
                  prevMonthOnClick={this.handlePrevMonthOnClick}
                />
                <Calendar
                  date={visibleDate}
                  dayRenderer={this.dayRenderer}
                  selectDay={this.selectDay}
                  disableDay={this.disableDay}
                />
              </div>
            )}
            {(selectedView === VIEWS.START_YEAR || selectedView === VIEWS.END_YEAR) && (
              <YearPicker minDate={minDate} maxDate={maxDate} date={visibleDate} yearOnClick={this.handleYearOnClick} />
            )}
            {(selectedView === VIEWS.START_TIME || selectedView === VIEWS.END_TIME) && (
              <TimePicker
                hourOnClick={this.handleHourOnClick}
                minuteOnClick={this.handleMinuteOnClick}
                date={visibleDate}
              />
            )}
          </Paper>
        </Popover>
      </div>
    );
  }
}

Picker.propTypes = {
  classes: PropTypes.object,
  minDate: PropTypes.instanceOf(moment),
  maxDate: PropTypes.instanceOf(moment),
  startDate: PropTypes.instanceOf(moment),
  endDate: PropTypes.instanceOf(moment),
  defaultStartDate: PropTypes.instanceOf(moment),
  defaultEndDate: PropTypes.instanceOf(moment),
  hoverDate: PropTypes.instanceOf(moment),
  visibleDate: PropTypes.instanceOf(moment),
  selectedView: PropTypes.string,
  yearOnClick: PropTypes.func,
  minuteOnClick: PropTypes.func,
  hourOnClick: PropTypes.func,
  dayOnClick: PropTypes.func,
  viewOnClick: PropTypes.func,
  dayOnMouseEnter: PropTypes.func,
  dayOnMouseLeave: PropTypes.func,
  onChange: PropTypes.func,
  prevMonthOnClick: PropTypes.func,
  nextMonthOnClick: PropTypes.func
};

Picker.defaultProps = {
  classes: {},
  minDate: moment().subtract(50, 'years'),
  maxDate: moment().add(50, 'years'),
  startDate: null,
  endDate: null,
  hoverDate: null,
  visibleDate: null,
  selectedView: null,
  defaultStartDate: null,
  defaultEndDate: null
};

const enhance = withStyles(({ typography, spacing }) => ({
  contentContainer: {
    overflow: 'hidden',
    fontFamily: typography.fontFamily,
    width: 284
  },
  calendarContainer: {
    padding: spacing.unit * 2,
    paddingTop: spacing.unit
  }
}));

export default enhance(Picker);
