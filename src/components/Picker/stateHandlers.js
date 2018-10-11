import moment from 'moment';

import { VIEWS } from './constants';
import { ifElse } from '../../utils/functional';

export const selectView = view => ({ startDate, endDate }) => {
  const newState = {
    selectedView: view
  };

  if ([VIEWS.START_DATE, VIEWS.START_TIME, VIEWS.START_YEAR].includes(view) && startDate) {
    newState.visibleDate = startDate;
  }

  if ([VIEWS.END_DATE, VIEWS.END_TIME, VIEWS.END_YEAR].includes(view) && endDate) {
    newState.visibleDate = endDate;
  }

  return newState;
};

export const selectHour = date => ({ selectedView, startDate, endDate }) => {
  switch (selectedView) {
    case VIEWS.START_TIME: {
      const newStartDate = ifElse(startDate, startDate, moment())
        .clone()
        .set('hour', date.hour());

      return {
        startDate: newStartDate,
        ...selectView(newStartDate.isAfter(endDate) ? VIEWS.END_TIME : VIEWS.START_TIME)({
          endDate,
          startDate: newStartDate
        })
      };
    }
    case VIEWS.END_TIME: {
      const newEndDate = ifElse(endDate, endDate, moment())
        .clone()
        .set('hour', date.hour());

      return {
        endDate: newEndDate,
        ...selectView(newEndDate.isBefore(startDate) ? VIEWS.START_TIME : VIEWS.END_TIME)({
          endDate: newEndDate,
          startDate
        })
      };
    }
    default:
      return {};
  }
};

export const selectMinute = date => ({ selectedView, startDate, endDate }) => {
  switch (selectedView) {
    case VIEWS.START_TIME: {
      const newStartDate = ifElse(startDate, startDate, moment())
        .clone()
        .set('minute', date.minute());

      return {
        startDate: newStartDate,
        ...selectView(newStartDate.isAfter(endDate) ? VIEWS.END_DATE : VIEWS.START_DATE)({
          endDate,
          startDate: newStartDate
        })
      };
    }
    case VIEWS.END_TIME: {
      const newEndDate = ifElse(endDate, endDate, moment())
        .clone()
        .set('minute', date.minute());

      return {
        endDate: newEndDate,
        ...selectView(newEndDate.isBefore(startDate) ? VIEWS.START_DATE : VIEWS.END_DATE)({
          endDate,
          startDate: newEndDate
        })
      };
    }
    default:
      return {};
  }
};

export const selectYear = date => ({ selectedView, startDate, endDate }) => {
  switch (selectedView) {
    case VIEWS.START_YEAR: {
      const newStartDate = ifElse(startDate, startDate, moment())
        .clone()
        .set('year', date.year());

      return {
        startDate: newStartDate,
        ...selectView(newStartDate.isAfter(endDate) ? VIEWS.END_DATE : VIEWS.START_DATE)({
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
        ...selectView(newEndDate.isBefore(startDate) ? VIEWS.START_DATE : VIEWS.END_DATE)({
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
    case VIEWS.START_DATE: {
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
        selectedView: !newEndDate ? VIEWS.END_DATE : VIEWS.START_DATE,
        hoveredDate: null
      };

      return newState;
    }
    case VIEWS.END_DATE: {
      const newEndDate = ifElse(endDate, endDate, moment())
        .clone()
        .set('year', date.year())
        .set('month', date.month())
        .set('date', date.date());

      const newState = {
        endDate: newEndDate,
        visibleDate: newEndDate,
        selectedView: VIEWS.START_DATE,
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
  if (selectedView === VIEWS.END_DATE && startDate && !endDate && hoveredDate.isBefore(startDate)) {
    return {
      selectedView: VIEWS.START_DATE,
      startDate: endDate,
      endDate: startDate
    };
  }

  if (selectedView === VIEWS.START_DATE && endDate && !startDate && hoveredDate.isAfter(endDate)) {
    return {
      selectedView: VIEWS.END_DATE,
      startDate: endDate,
      endDate: startDate
    };
  }

  return {};
};

export const sortDates = ({ startDate, endDate }) => {
  if ((startDate && startDate.isAfter(endDate)) || (endDate && endDate.isBefore(startDate))) {
    return {
      startDate: endDate,
      endDate: startDate
    };
  }

  return {};
};

export const updateDefaultDates = (startDate, endDate) => ({
  startDate: startDate ? startDate.clone() : null,
  endDate: endDate ? endDate.clone() : null
});

export const incrementVisibleMonth = ({ visibleDate }) => ({ visibleDate: visibleDate.clone().add(1, 'month') });

export const decrementVisibleMonth = ({ visibleDate }) => ({ visibleDate: visibleDate.clone().subtract(1, 'month') });

export const openPopover = {
  open: true
};

export const closePopover = { open: false, anchorEl: null };
