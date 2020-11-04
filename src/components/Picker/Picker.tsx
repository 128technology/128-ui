import * as _ from 'lodash';
import * as React from 'react';
import * as moment from 'moment';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Popover, { PopoverOrigin } from '@material-ui/core/Popover';
import { withStyles, Theme, WithStyles } from '@material-ui/core/styles';

import CalendarController from './CalendarController';
import CalendarDay from './CalendarDay';
import CalendarHeader from './CalendarHeader';
import YearPicker from './YearPicker';
import TimePicker from './TimePicker';
import * as stateHandlers from './stateHandlers';
import Calendar, { CalendarProps } from '../Calendar';
import { VIEWS } from './constants';
import { Button } from '@material-ui/core';

const styles = ({ typography, spacing, palette }: Theme) => ({
  contentContainer: {
    overflow: 'hidden',
    fontFamily: typography.fontFamily,
    width: 284
  },
  calendarContainer: {
    padding: spacing(2),
    paddingTop: spacing(1)
  },
  errorMessage: {
    color: palette.error.main,
    fontStyle: 'italic',
    textAlign: 'center' as any
  }
});

export type Colors = 'primary' | 'secondary' | 'error';

export interface IProps extends WithStyles<typeof styles> {
  open?: boolean;
  startDate?: moment.Moment;
  endDate?: moment.Moment;
  minDate?: moment.Moment;
  maxDate?: moment.Moment;
  timeErrorMessage?: string | Error;
  closeOnBackgroundClick?: boolean;
  onSetTimeError?: () => void;
  onChange?: (startDate: moment.Moment | null, endDate: moment.Moment | null) => void;
  popoverOnClose?: (startDate: moment.Moment | null, endDate: moment.Moment | null) => void;
  hourOnClick?: (e: React.MouseEvent<HTMLElement>, date: moment.Moment) => void;
  yearOnClick?: (e: React.MouseEvent<HTMLElement>, date: moment.Moment) => void;
  minuteOnClick?: (e: React.MouseEvent<HTMLElement>, date: moment.Moment) => void;
  dayOnClick?: (e: React.MouseEvent<HTMLElement>, date: moment.Moment) => void;
  nextMonthOnClick?: (e: React.MouseEvent<HTMLElement>) => void;
  prevMonthOnClick?: (e: React.MouseEvent<HTMLElement>) => void;
  viewOnClick?: (e: React.MouseEvent<HTMLElement>, view: string) => void;
  disableDate?: (date: moment.Moment) => boolean;
  textFieldOnFocus?: () => void;
  popoverAnchorOrigin?: PopoverOrigin;
  popoverTransformOrigin?: PopoverOrigin;
  color: Colors;
  textFieldRenderer?: (
    startDate: moment.Moment | null,
    endDate: moment.Moment | null,
    openPopover: () => void,
    closePopover: () => void
  ) => React.ReactNode;
}

export interface IState {
  visibleDate: moment.Moment;
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
  hoveredDate: moment.Moment | null;
  open: boolean;
  selectedView: string;
  error?: boolean;
}

export class Picker extends React.Component<IProps, IState> {
  static defaultProps = {
    color: 'primary' as Colors,
    closeOnBackgroundClick: true
  };

  private anchorEl?: HTMLElement | null;

  constructor(props: IProps) {
    super(props);

    const startDate = props.startDate ? props.startDate.clone() : moment().subtract(1, 'day');

    this.state = {
      visibleDate: startDate,
      selectedView: VIEWS.START_DATE,
      startDate,
      endDate: props.endDate ? props.endDate.clone() : moment(),
      open: false,
      hoveredDate: null,
      error: false
    };
  }

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    const { startDate, endDate } = this.props;

    if (prevState.startDate !== this.state.startDate || prevState.endDate !== this.state.endDate) {
      this.handlePickerOnChange();
    }

    if (prevProps.startDate !== startDate || prevProps.endDate !== endDate) {
      this.setState({
        startDate: startDate ? startDate.clone() : moment().subtract(1, 'day'),
        endDate: endDate ? endDate.clone() : moment()
      });
    }
  }

  handlePickerOnChange() {
    const { onChange } = this.props;
    const { startDate, endDate } = this.state;

    if (onChange) {
      onChange(startDate, endDate);
    }

    if (startDate && endDate) {
      this.resetError();
    }
  }

  handleSelectViewOnClick = (e: React.MouseEvent<HTMLElement>, view: string) => {
    const { viewOnClick } = this.props;

    if (viewOnClick) {
      viewOnClick(e, view);
    }

    this.setState(stateHandlers.selectView(view));
  };

  handleYearOnClick = (e: React.MouseEvent<HTMLElement>, date: moment.Moment) => {
    const { yearOnClick } = this.props;

    if (yearOnClick) {
      yearOnClick(e, date);
    }

    this.setState(stateHandlers.selectYear(date));
    this.setState(stateHandlers.sortDates);
  };

  handleHourOnClick = (e: React.MouseEvent<HTMLElement>, date: moment.Moment) => {
    const { hourOnClick } = this.props;

    if (hourOnClick) {
      hourOnClick(e, date);
    }

    this.setState(stateHandlers.selectHour(date));
    this.setState(stateHandlers.sortDates);
  };

  handleMinuteOnClick = (e: React.MouseEvent<HTMLElement>, date: moment.Moment) => {
    const { minuteOnClick } = this.props;

    if (minuteOnClick) {
      minuteOnClick(e, date);
    }

    this.setState(stateHandlers.selectMinute(date));
    this.setState(stateHandlers.sortDates);
  };

  handleDayOnClick = (e: React.MouseEvent<HTMLElement>, date: moment.Moment) => {
    const { dayOnClick } = this.props;

    if (dayOnClick) {
      dayOnClick(e, date);
    }

    this.setState(stateHandlers.selectDate(date));
    this.setState(stateHandlers.sortDates);
  };

  handleDayOnMouseEnter = (e: React.MouseEvent<HTMLElement>, date: moment.Moment) => {
    this.setState(stateHandlers.hoverDate(date));
    this.setState(stateHandlers.sortHoverDatesAndView);
  };

  handleOnMouseLeave = () => this.setState({ hoveredDate: null });

  handleTextFieldFocus = () => {
    const { textFieldOnFocus } = this.props;

    if (textFieldOnFocus) {
      textFieldOnFocus();
    }

    if (this.anchorEl) {
      this.anchorEl.blur();
    }

    this.openPopover();
  };

  onConfirm = () => {
    const { startDate, endDate } = this.state;
    const { popoverOnClose } = this.props;

    if (popoverOnClose) {
      popoverOnClose(startDate, endDate);
    }

    this.closePopover();
  }
  
  onCancel = () => {
    this.closePopover();
  }

  setError = () => {
    this.setState({ error: true });
  }

  resetError = () => {
    this.setState({ error: false });
  }

  handlePopoverOnClose = (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
    const { popoverOnClose, onSetTimeError, closeOnBackgroundClick } = this.props;
    const { startDate, endDate } = this.state;
    if (reason === 'backdropClick' && closeOnBackgroundClick === false) {
      return;
    }

    if (reason === 'escapeKeyDown') {
      this.closePopover();
      return;
    }
    
    if (!startDate || !endDate) {
      if (onSetTimeError) {
        onSetTimeError();
      }
      this.setError();
      return;
    }

    this.resetError();

    if (popoverOnClose) {
      popoverOnClose(startDate, endDate);
    }

    this.closePopover();
  };

  handlePrevMonthOnClick = (e: React.MouseEvent<HTMLElement>) => {
    const { prevMonthOnClick } = this.props;

    if (prevMonthOnClick) {
      prevMonthOnClick(e);
    } else {
      this.setState(stateHandlers.decrementVisibleMonth);
    }
  };

  handleNextMonthOnClick = (e: React.MouseEvent<HTMLElement>) => {
    const { nextMonthOnClick } = this.props;

    if (nextMonthOnClick) {
      nextMonthOnClick(e);
    } else {
      this.setState(stateHandlers.incrementVisibleMonth);
    }
  };

  setPopoverAnchor = (el: HTMLElement | null) => {
    this.anchorEl = el;
  };

  closePopover = () => this.setState({ open: false });

  openPopover = () => this.setState({ open: true });

  selectDay = (date: moment.Moment) => {
    const startDate = this.getVisibleStartDate();
    const endDate = this.getVisibleEndDate();
    return (startDate ? date.isSame(startDate, 'day') : false) || (endDate ? date.isSame(endDate, 'day') : false);
  };

  getVisibleStartDate = () => {
    const { selectedView, startDate } = this.state;
    return selectedView === VIEWS.START_DATE && !startDate ? this.getHoveredDate() : startDate;
  };

  getVisibleEndDate = () => {
    const { selectedView, endDate } = this.state;
    return selectedView === VIEWS.END_DATE && !endDate ? this.getHoveredDate() : endDate;
  };

  getHoveredDate = () => {
    const { hoveredDate } = this.state;
    return hoveredDate ? hoveredDate.clone() : hoveredDate;
  };

  getFormattedDateRange = () => {
    const { startDate, endDate } = this.state;
    return [startDate, endDate]
      .filter(x => !!x)
      .map(x => (x ? x.format('YYYY/MM/d HH:mm') : ''))
      .join(' - ');
  };

  isPopoverOpen() {
    return this.props.open === true || this.state.open === true;
  }

  dayRenderer: CalendarProps['dayRenderer'] = (date, dayProps, symbol) => {
    const { color } = this.props;
    const startDate = this.getVisibleStartDate();
    const endDate = this.getVisibleEndDate();

    return (
      <CalendarDay
        date={date}
        dayProps={dayProps}
        startDate={startDate || undefined}
        endDate={endDate || undefined}
        onClick={this.handleDayOnClick}
        onMouseEnter={this.handleDayOnMouseEnter}
        color={color}
      >
        {symbol}
      </CalendarDay>
    );
  };

  disableDay = (d: moment.Moment, inCurrentMonth: boolean) => {
    const { disableDate } = this.props;
    return !inCurrentMonth || (_.isFunction(disableDate) && disableDate(d));
  };

  render() {
    const {
      classes,
      minDate = moment().subtract(50, 'years'),
      maxDate = moment().add(50, 'years'),
      textFieldRenderer,
      disableDate,
      popoverAnchorOrigin,
      popoverTransformOrigin,
      color
    } = this.props;

    const { visibleDate, selectedView } = this.state;

    const startDate = this.getVisibleStartDate();
    const endDate = this.getVisibleEndDate();

    return (
      <div>
        {_.isFunction(textFieldRenderer) ? (
          <div ref={this.setPopoverAnchor}>
            {textFieldRenderer(startDate, endDate, this.openPopover, this.closePopover)}
          </div>
        ) : (
          <TextField
            color={color}
            inputRef={this.setPopoverAnchor}
            onFocus={this.handleTextFieldFocus}
            value={this.getFormattedDateRange()}
          />
        )}
        <Popover
          open={this.isPopoverOpen()}
          onClose={this.handlePopoverOnClose}
          anchorEl={this.isPopoverOpen() ? this.anchorEl : undefined}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            ...popoverAnchorOrigin
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
            ...popoverTransformOrigin
          }}
        >
          <Paper elevation={1} className={classes.contentContainer}>
       
            <CalendarHeader
              selectedView={selectedView}
              selectViewOnClick={this.handleSelectViewOnClick}
              startDate={startDate || undefined}
              endDate={endDate || undefined}
              color={this.state.error ? 'error' : color}
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
                  color={color}
                  dayRenderer={this.dayRenderer}
                  selectDay={this.selectDay}
                  disableDay={this.disableDay}
                />
              </div>
            )}
            {(selectedView === VIEWS.START_YEAR || selectedView === VIEWS.END_YEAR) && (
              <YearPicker
                minDate={minDate}
                maxDate={maxDate}
                date={visibleDate}
                yearOnClick={this.handleYearOnClick}
                disableDate={disableDate}
              />
            )}
            {(selectedView === VIEWS.START_TIME || selectedView === VIEWS.END_TIME) && (
              <TimePicker
                hourOnClick={this.handleHourOnClick}
                minuteOnClick={this.handleMinuteOnClick}
                date={visibleDate}
                disableDate={disableDate}
              />
            )}
            {this.props.closeOnBackgroundClick === false && (
            <React.Fragment>
              <Button color="secondary" onClick={this.onCancel}>Cancel</Button>
              <Button color="primary" onClick={this.onConfirm} disabled={!this.state.startDate || !this.state.endDate}>Confirm</Button>
              </React.Fragment>
              )}
               {this.state.error && this.props.timeErrorMessage && <div className={classes.errorMessage}>{this.props.timeErrorMessage}</div>}
          </Paper>
        </Popover>
      </div>
    );
  }
}

export default withStyles(styles)(Picker);
