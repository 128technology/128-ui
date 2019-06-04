import * as moment from 'moment';

import { IState } from './Picker';
import { VIEWS } from './constants';

export const selectView = (view: string) => ({
  startDate,
  endDate
}: {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
}) => {
  if ([VIEWS.START_DATE, VIEWS.START_TIME, VIEWS.START_YEAR].includes(view) && startDate) {
    return {
      selectedView: view,
      visibleDate: startDate
    };
  }

  if ([VIEWS.END_DATE, VIEWS.END_TIME, VIEWS.END_YEAR].includes(view) && endDate) {
    return {
      selectedView: view,
      visibleDate: endDate
    };
  }

  return null;
};

export const selectHour = (date: moment.Moment) => (state: IState) => {
  const { selectedView, startDate, endDate } = state;

  switch (selectedView) {
    case VIEWS.START_TIME: {
      const newStartDate = (startDate ? startDate : moment()).clone().set('hour', date.hour());

      return {
        ...state,
        startDate: newStartDate,
        ...selectView(endDate && newStartDate.isAfter(endDate) ? VIEWS.END_TIME : VIEWS.START_TIME)({
          endDate,
          startDate: newStartDate
        })
      };
    }
    case VIEWS.END_TIME: {
      const newEndDate = (endDate ? endDate : moment()).clone().set('hour', date.hour());

      return {
        ...state,
        endDate: newEndDate,
        ...selectView(startDate && newEndDate.isBefore(startDate) ? VIEWS.START_TIME : VIEWS.END_TIME)({
          endDate: newEndDate,
          startDate
        })
      };
    }
    default:
      return null;
  }
};

export const selectMinute = (date: moment.Moment) => (state: IState) => {
  const { selectedView, startDate, endDate } = state;

  switch (selectedView) {
    case VIEWS.START_TIME: {
      const newStartDate = (startDate ? startDate : moment()).clone().set('minute', date.minute());

      return {
        ...state,
        startDate: newStartDate,
        ...selectView(endDate && newStartDate.isAfter(endDate) ? VIEWS.END_DATE : VIEWS.START_DATE)({
          endDate,
          startDate: newStartDate
        })
      };
    }
    case VIEWS.END_TIME: {
      const newEndDate = (endDate ? endDate : moment()).clone().set('minute', date.minute());

      return {
        ...state,
        endDate: newEndDate,
        ...selectView(startDate && newEndDate.isBefore(startDate) ? VIEWS.START_DATE : VIEWS.END_DATE)({
          endDate,
          startDate: newEndDate
        })
      };
    }
    default:
      return null;
  }
};

export const selectYear = (date: moment.Moment) => (state: IState) => {
  const { selectedView, startDate, endDate } = state;

  switch (selectedView) {
    case VIEWS.START_YEAR: {
      const newStartDate = (startDate ? startDate : moment()).clone().set('year', date.year());

      return {
        ...state,
        startDate: newStartDate,
        ...selectView(endDate && newStartDate.isAfter(endDate) ? VIEWS.END_DATE : VIEWS.START_DATE)({
          endDate,
          startDate: newStartDate
        })
      };
    }
    case VIEWS.END_YEAR: {
      const newEndDate = (endDate ? endDate : moment()).clone().set('year', date.year());

      return {
        ...state,
        endDate: newEndDate,
        ...selectView(startDate && newEndDate.isBefore(startDate) ? VIEWS.START_DATE : VIEWS.END_DATE)({
          startDate,
          endDate: newEndDate
        })
      };
    }
    default:
      return null;
  }
};

export const selectDate = (date: moment.Moment) => ({
  selectedView,
  startDate,
  endDate
}: Pick<IState, 'selectedView' | 'startDate' | 'endDate'>) => {
  switch (selectedView) {
    case VIEWS.START_DATE: {
      const newStartDate = (startDate ? startDate : moment())
        .clone()
        .set('year', date.year())
        .set('month', date.month())
        .set('date', date.date());

      const newEndDate = startDate && endDate ? null : endDate;

      const newState = {
        startDate: newStartDate,
        endDate: newEndDate,
        visibleDate: newStartDate,
        selectedView: !newEndDate ? VIEWS.END_DATE : VIEWS.START_DATE
      };

      return newState;
    }
    case VIEWS.END_DATE: {
      const newEndDate = (endDate ? endDate : moment())
        .clone()
        .set('year', date.year())
        .set('month', date.month())
        .set('date', date.date());

      const newState = {
        startDate,
        endDate: newEndDate,
        visibleDate: newEndDate,
        selectedView: VIEWS.START_DATE
      };

      return newState;
    }
    default:
      return null;
  }
};

export const hoverDate = (date: moment.Moment) => () => ({
  hoveredDate: moment()
    .set('year', date.year())
    .set('month', date.month())
    .set('date', date.date())
});

export const sortHoverDatesAndView = ({
  hoveredDate,
  startDate,
  endDate,
  selectedView
}: Pick<IState, 'hoveredDate' | 'startDate' | 'endDate' | 'selectedView'>) => {
  if (selectedView === VIEWS.END_DATE && startDate && !endDate && hoveredDate && hoveredDate.isBefore(startDate)) {
    return {
      selectedView: VIEWS.START_DATE,
      startDate: endDate,
      endDate: startDate
    };
  }

  if (selectedView === VIEWS.START_DATE && endDate && !startDate && hoveredDate && hoveredDate.isAfter(endDate)) {
    return {
      selectedView: VIEWS.END_DATE,
      startDate: endDate,
      endDate: startDate
    };
  }

  return null;
};

export const sortDates = ({ startDate, endDate }: Pick<IState, 'startDate' | 'endDate'>) => {
  if ((startDate && endDate && startDate.isAfter(endDate)) || (endDate && startDate && endDate.isBefore(startDate))) {
    return {
      startDate: endDate,
      endDate: startDate
    };
  }

  return null;
};

export const incrementVisibleMonth = ({ visibleDate }: IState) => ({
  visibleDate: visibleDate.clone().add(1, 'month')
});

export const decrementVisibleMonth = ({ visibleDate }: IState) => ({
  visibleDate: visibleDate.clone().subtract(1, 'month')
});
