import moment from 'moment';

import { VIEWS } from './constants';
import { ifElse } from '../../utils/functional';

export const selectView = view => ({ startDate, endDate }) => {
  const newState = {
    selectedView: view
  };

  if (view === VIEWS.START_MONTH && startDate) {
    newState.visibleDate = startDate;
  }

  if (view === VIEWS.END_MONTH && endDate) {
    newState.visibleDate = endDate;
  }

  return newState;
};

export const selectYear = date => ({ selectedView, startDate, endDate }) => {
  switch (selectedView) {
    case VIEWS.START_YEAR: {
      const newStartDate = ifElse(startDate, startDate, moment())
        .clone()
        .set('year', date.year());

      return {
        startDate: newStartDate,
        ...this.selectView(newStartDate.isAfter(endDate, 'year') ? VIEWS.END_MONTH : VIEWS.START_MONTH)({
          endDate,
          startDate: newStartDate
        })
      };
    }
    case VIEWS.END_YEAR: {
      const newEndDate = ifElse(endDate, endDate, moment())
        .clone()
        .set('year', date.year());

      return {
        endDate: newEndDate,
        ...this.selectView(newEndDate.isBefore(startDate, 'year') ? VIEWS.START_MONTH : VIEWS.END_MONTH)({
          startDate,
          endDate: newEndDate
        })
      };
    }
    default:
      return {};
  }
};

export const selectDate = date => ({ selectedView, startDate, endDate }) => {
  switch (selectedView) {
    case VIEWS.START_MONTH: {
      const newStartDate = ifElse(startDate, startDate, moment())
        .clone()
        .set('year', date.year())
        .set('month', date.month())
        .set('date', date.date());

      const newEndDate = startDate && endDate ? null : endDate;

      const newState = {
        startDate: newStartDate,
        endDate: newEndDate,
        visibleDate: newStartDate,
        selectedView: !newEndDate ? VIEWS.END_MONTH : VIEWS.START_MONTH,
        hoveredDate: null
      };

      return newState;
    }
    case VIEWS.END_MONTH: {
      const newEndDate = ifElse(endDate, endDate, moment())
        .clone()
        .set('year', date.year())
        .set('month', date.month())
        .set('date', date.date());

      const newState = {
        endDate: newEndDate,
        visibleDate: newEndDate,
        selectedView: VIEWS.START_MONTH,
        hoveredDate: null
      };

      return newState;
    }
    default:
      return {};
  }
};

export const hoverDate = date => () => ({
  hoveredDate: moment()
    .set('year', date.year())
    .set('month', date.month())
    .set('date', date.date())
});

export const clearHoverDate = {
  hoverDate: null
};

export const sortHoverDatesAndView = ({ hoveredDate, startDate, endDate, selectedView }) => {
  if (startDate && endDate) {
    return {};
  }

  if (
    (selectedView === VIEWS.END_MONTH && startDate && hoveredDate.isBefore(startDate, 'day')) ||
    (selectedView === VIEWS.START_MONTH && endDate && hoveredDate.isAfter(endDate, 'day'))
  ) {
    return {
      selectedView: selectedView === VIEWS.START_MONTH ? VIEWS.END_MONTH : VIEWS.START_MONTH,
      startDate: endDate,
      endDate: startDate
    };
  }

  return {};
};

export const sortDates = ({ startDate, endDate }) => {
  if ((startDate && startDate.isAfter(endDate, 'day')) || (endDate && endDate.isBefore(startDate, 'day'))) {
    return {
      startDate: endDate,
      endDate: startDate
    };
  }

  return {};
};

export const incrementVisibleDate = ({ visibleDate }) => ({ visibleDate: visibleDate.clone().add(1, 'month') });

export const decrementVisibleDate = ({ visibleDate }) => ({ visibleDate: visibleDate.clone().subtract(1, 'month') });
