import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';

import CalendarDay from './CalendarDay';
import CalendarHeader from './CalendarHeader';
import YearPicker from './YearPicker';
import CalendarController from './CalendarController';
import * as stateHandlers from './stateHandlers';
import { Calendar } from '../Calendar';
import { VIEWS } from './constants';

class Picker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visibleDate: moment(),
      selectedView: VIEWS.START_MONTH,
      startDate: null,
      endDate: null,
      hoveredDate: null
    };
  }

  handleSelectViewOnClick = (e, view) => {
    this.setState(stateHandlers.selectView(view));
  };

  handleYearOnClick = (e, date) => {
    this.setState(stateHandlers.selectYear(date));
    this.setState(stateHandlers.sortDates);
  };

  handleDayOnClick = (e, date) => {
    this.setState(stateHandlers.selectDate(date));
    this.setState(stateHandlers.sortDates);
  };

  handleDayOnMouseEnter = (e, date) => {
    this.setState(stateHandlers.hoverDate(date));
    this.setState(stateHandlers.sortHoverDatesAndView);
  };

  handleOnMouseLeave = () => {
    this.setState(stateHandlers.clearHoverDate);
  };

  handlePrevMonthOnClick = e => {
    const { prevMonthOnClick } = this.props;

    if (prevMonthOnClick) {
      prevMonthOnClick(e);
    } else {
      this.setState(stateHandlers.decrementVisibleDate);
    }
  };

  handleNextMonthOnClick = e => {
    const { nextMonthOnClick } = this.props;

    if (nextMonthOnClick) {
      nextMonthOnClick(e);
    } else {
      this.setState(stateHandlers.incrementVisibleDate);
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
    return selectedView === VIEWS.START_MONTH && !startDate ? this.getHoveredDate() : startDate;
  };

  getVisibleEndDate = () => {
    const { selectedView } = this.state;
    const endDate = this.getEndDate();
    return selectedView === VIEWS.END_MONTH && !endDate ? this.getHoveredDate() : endDate;
  };

  getHoveredDate = () => {
    const hoveredDate = this.props.hoveredDate || this.state.hoveredDate;
    return hoveredDate ? hoveredDate.clone() : hoveredDate;
  };

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

  render() {
    const { visibleDate, selectedView } = this.state;
    const { classes, minDate, maxDate } = this.props;
    const startDate = this.getVisibleStartDate();
    const endDate = this.getVisibleEndDate();

    return (
      <div className={classes.calendar}>
        <TextField />
        <Paper elevation={1} className={classes.contentContainer}>
          <CalendarHeader
            selectedView={selectedView}
            selectViewOnClick={this.handleSelectViewOnClick}
            startDate={startDate}
            endDate={endDate}
          />
          {(selectedView === VIEWS.START_MONTH || selectedView === VIEWS.END_MONTH) && (
            <div className={classes.calendarContainer} onMouseLeave={this.handleOnMouseLeave}>
              <CalendarController
                date={visibleDate}
                nextMonthOnClick={this.handleNextMonthOnClick}
                prevMonthOnClick={this.handlePrevMonthOnClick}
              />
              <Calendar date={visibleDate} dayRenderer={this.dayRenderer} selectDay={this.selectDay} />
            </div>
          )}
          {(selectedView === VIEWS.START_YEAR || selectedView === VIEWS.END_YEAR) && (
            <YearPicker
              minDate={minDate}
              maxDate={maxDate}
              date={selectedView === VIEWS.START_YEAR ? startDate : endDate}
              yearOnClick={this.handleYearOnClick}
            />
          )}
        </Paper>
      </div>
    );
  }
}

Picker.propTypes = {
  classes: PropTypes.object,
  minDate: PropTypes.instanceOf(moment),
  maxDate: PropTypes.instanceOf(moment)
};

Picker.defaultProps = {
  classes: {},
  minDate: moment().subtract(50, 'years'),
  maxDate: moment().add(50, 'years')
};

const enhance = withStyles(({ palette, typography, spacing }) => ({
  contentContainer: {
    overflow: 'hidden',
    fontFamily: typography.fontFamily,
    position: 'absolute',
    width: 284
  },
  calendarContainer: {
    padding: spacing.unit * 2,
    paddingTop: spacing.unit
  }
}));

export default enhance(Picker);
