import * as moment from 'moment';
import * as sinon from 'sinon';
import { expect } from 'chai';

import * as stateHandlers from '../stateHandlers';
import { VIEWS } from '../constants';

describe('State Handlers', () => {
  let timers: sinon.SinonFakeTimers;

  beforeEach(() => {
    timers = sinon.useFakeTimers(new Date('2019-01-29T18:27:59.199Z'));
  });

  afterEach(() => {
    timers.restore();
  });

  describe('selectView', () => {
    [VIEWS.START_DATE, VIEWS.START_TIME, VIEWS.START_YEAR].forEach(view => {
      it(`should set start date when ${view} view is selected`, () => {
        const startDate = moment().subtract('1', 'day');
        const endDate = moment().subtract();
        const newState = stateHandlers.selectView(view)({ startDate, endDate });
        expect(newState!.visibleDate).to.equal(startDate);
      });
    });

    [VIEWS.END_DATE, VIEWS.END_TIME, VIEWS.END_YEAR].forEach(view => {
      it(`should set start date when ${view} view is selected`, () => {
        const startDate = moment().subtract('1', 'day');
        const endDate = moment().subtract();
        const newState = stateHandlers.selectView(view)({ startDate, endDate });
        expect(newState!.visibleDate).to.equal(endDate);
      });
    });
  });

  describe('selectHour', () => {
    it('should set the view to START_TIME when selecting a START_TIME hour that is before the endTime', () => {
      const date = moment();
      const hour = date.clone().subtract(1, 'hour');
      const selectedView = VIEWS.START_TIME;
      const newState = stateHandlers.selectHour(hour)({
        startDate: date,
        endDate: date,
        selectedView,
        visibleDate: moment(),
        hoveredDate: null,
        open: false
      });
      expect(newState!.selectedView).to.equal(VIEWS.START_TIME);
    });

    it('should set the view to END_TIME when selecting a START_TIME hour that is after the endTime', () => {
      const date = moment();
      const hour = date.clone().add(1, 'hour');
      const selectedView = VIEWS.START_TIME;
      const newState = stateHandlers.selectHour(hour)({
        startDate: date,
        endDate: date,
        selectedView,
        visibleDate: moment(),
        hoveredDate: null,
        open: false
      });
      expect(newState!.selectedView).to.equal(VIEWS.END_TIME);
    });

    it('should set the view to END_TIME when selecting an END_TIME hour that is after the startTime', () => {
      const date = moment();
      const hour = date.clone().add(1, 'hour');
      const selectedView = VIEWS.END_TIME;
      const newState = stateHandlers.selectHour(hour)({
        startDate: date,
        endDate: date,
        selectedView,
        visibleDate: moment(),
        hoveredDate: null,
        open: false
      });
      expect(newState!.selectedView).to.equal(VIEWS.END_TIME);
    });

    it('should set the view to START_TIME when selecting an END_TIME hour that is before the startTime', () => {
      const date = moment();
      const hour = date.clone().subtract(1, 'hour');
      const selectedView = VIEWS.END_TIME;
      const newState = stateHandlers.selectHour(hour)({
        startDate: date,
        endDate: date,
        selectedView,
        visibleDate: moment(),
        hoveredDate: null,
        open: false
      });
      expect(newState!.selectedView).to.equal(VIEWS.START_TIME);
    });
  });

  describe('selectMinute', () => {
    it('should set the view to START_DATE when selecting a START_TIME minute that is before the endTime', () => {
      const date = moment();
      const minute = date.clone().subtract(1, 'minute');
      const selectedView = VIEWS.START_TIME;
      const newState = stateHandlers.selectMinute(minute)({
        startDate: date,
        endDate: date,
        selectedView,
        visibleDate: moment(),
        hoveredDate: null,
        open: false
      });
      expect(newState!.selectedView).to.equal(VIEWS.START_DATE);
    });

    it('should set the view to END_DATE when selecting a START_TIME minute that is after the endTime', () => {
      const date = moment();
      const minute = date.clone().add(1, 'minute');
      const selectedView = VIEWS.START_TIME;
      const newState = stateHandlers.selectMinute(minute)({
        startDate: date,
        endDate: date,
        selectedView,
        visibleDate: moment(),
        hoveredDate: null,
        open: false
      });
      expect(newState!.selectedView).to.equal(VIEWS.END_DATE);
    });

    it('should set the view to END_DATE when selecting an END_TIME minute that is after the startTime', () => {
      const date = moment();
      const minute = date.clone().add(1, 'minute');
      const selectedView = VIEWS.END_TIME;
      const newState = stateHandlers.selectMinute(minute)({
        startDate: date,
        endDate: date,
        selectedView,
        visibleDate: moment(),
        hoveredDate: null,
        open: false
      });
      expect(newState!.selectedView).to.equal(VIEWS.END_DATE);
    });

    it('should set the view to START_DATE when selecting an END_TIME minute that is before the startTime', () => {
      const date = moment();
      const minute = date.clone().subtract(1, 'minute');
      const selectedView = VIEWS.END_TIME;
      const newState = stateHandlers.selectMinute(minute)({
        startDate: date,
        endDate: date,
        selectedView,
        visibleDate: moment(),
        hoveredDate: null,
        open: false
      });
      expect(newState!.selectedView).to.equal(VIEWS.START_DATE);
    });
  });

  describe('selectYear', () => {
    it('should set the view to START_DATE when selecting a START_YEAR that is before the endTime', () => {
      const date = moment();
      const year = date.clone().subtract(1, 'year');
      const selectedView = VIEWS.START_YEAR;
      const newState = stateHandlers.selectYear(year)({
        startDate: date,
        endDate: date,
        selectedView,
        visibleDate: moment(),
        hoveredDate: null,
        open: false
      });
      expect(newState!.selectedView).to.equal(VIEWS.START_DATE);
    });

    it('should set the view to END_DATE when selecting a START_YEAR that is after the endTime', () => {
      const date = moment();
      const year = date.clone().add(1, 'year');
      const selectedView = VIEWS.START_YEAR;
      const newState = stateHandlers.selectYear(year)({
        startDate: date,
        endDate: date,
        selectedView,
        visibleDate: moment(),
        hoveredDate: null,
        open: false
      });
      expect(newState!.selectedView).to.equal(VIEWS.END_DATE);
    });

    it('should set the view to END_DATE when selecting an END_YEAR that is after the startTime', () => {
      const date = moment();
      const year = date.clone().add(1, 'year');
      const selectedView = VIEWS.END_YEAR;
      const newState = stateHandlers.selectYear(year)({
        startDate: date,
        endDate: date,
        selectedView,
        visibleDate: moment(),
        hoveredDate: null,
        open: false
      });
      expect(newState!.selectedView).to.equal(VIEWS.END_DATE);
    });

    it('should set the view to START_DATE when selecting an END_YEAR that is before the startTime', () => {
      const date = moment();
      const year = date.clone().subtract(1, 'year');
      const selectedView = VIEWS.END_YEAR;
      const newState = stateHandlers.selectYear(year)({
        startDate: date,
        endDate: date,
        selectedView,
        visibleDate: moment(),
        hoveredDate: null,
        open: false
      });
      expect(newState!.selectedView).to.equal(VIEWS.START_DATE);
    });
  });

  describe('selectDate', () => {
    it('should set the selected view to END_DATE when no endDate is set', () => {
      const date = moment();
      const selectedView = VIEWS.START_DATE;
      const newState = stateHandlers.selectDate(date)({ startDate: null, endDate: null, selectedView });
      expect(newState!.selectedView).to.equal(VIEWS.END_DATE);
    });

    it('should set the selected view to START_DATE when an endDate has been set', () => {
      const date = moment();
      const selectedView = VIEWS.START_DATE;
      const newState = stateHandlers.selectDate(date)({ startDate: null, endDate: date, selectedView });
      expect(newState!.selectedView).to.equal(VIEWS.START_DATE);
    });

    it('should clear the endDate when a new startDate is set and both a startDate and endDate already exist', () => {
      const date = moment();
      const selectedView = VIEWS.START_DATE;
      const newState = stateHandlers.selectDate(date)({ startDate: moment(), endDate: moment(), selectedView });
      expect(newState!.endDate).to.equal(null);
    });
  });

  describe('sortHoverDatesAndView', () => {
    it('should flip start and end dates if hoveredDate is before startDate', () => {
      const date = moment();
      const hoveredDate = date.clone().subtract(1, 'day');
      const selectedView = VIEWS.END_DATE;
      const newState = stateHandlers.sortHoverDatesAndView({
        hoveredDate,
        startDate: date,
        endDate: null,
        selectedView
      });

      expect(newState).to.deep.equal({
        selectedView: VIEWS.START_DATE,
        startDate: null,
        endDate: date
      });
    });

    it('should flip start and end dates if hoveredDate is after endDate', () => {
      const date = moment();
      const hoveredDate = date.clone().add(1, 'day');
      const selectedView = VIEWS.START_DATE;
      const newState = stateHandlers.sortHoverDatesAndView({
        hoveredDate,
        startDate: null,
        endDate: date,
        selectedView
      });

      expect(newState).to.deep.equal({
        selectedView: VIEWS.END_DATE,
        startDate: date,
        endDate: null
      });
    });

    it('should do nothing if not in DATE view', () => {
      const date = moment();
      const hoveredDate = date.clone().subtract(1, 'day');
      const selectedView = VIEWS.START_YEAR;
      const newState = stateHandlers.sortHoverDatesAndView({
        hoveredDate,
        startDate: date,
        endDate: null,
        selectedView
      });

      expect(newState).to.deep.equal(null);
    });

    it('should do nothing if both a start and end date are set', () => {
      const date = moment();
      const hoveredDate = date.clone().subtract(1, 'day');
      const selectedView = VIEWS.START_YEAR;
      const newState = stateHandlers.sortHoverDatesAndView({
        hoveredDate,
        startDate: date,
        endDate: date,
        selectedView
      });

      expect(newState).to.deep.equal(null);
    });
  });

  describe('sortDates', () => {
    it('should sort dates if they are flipped', () => {
      const date = moment();
      const startDate = date.clone().add(1, 'day');
      const newState = stateHandlers.sortDates({ startDate, endDate: date });

      expect(newState).to.deep.equal({
        startDate: date,
        endDate: startDate
      });
    });

    it('should do nothing if dates are unset', () => {
      const newState = stateHandlers.sortDates({ startDate: null, endDate: null });
      expect(newState).to.deep.equal(null);
    });

    it('should do nothing if dates are set and not flipped', () => {
      const startDate = moment();
      const endDate = startDate.clone();
      const newState = stateHandlers.sortDates({ startDate, endDate });
      expect(newState).to.deep.equal(null);
    });
  });
});
