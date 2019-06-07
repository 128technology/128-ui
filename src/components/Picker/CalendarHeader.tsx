import * as _ from 'lodash';
import * as React from 'react';
import * as moment from 'moment';
import * as classNames from 'classnames';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';

import CalendarHeaderButton from './CalendarHeaderButton';
import { VIEWS } from './constants';

const styles = ({ palette, spacing, shadows }: Theme) =>
  createStyles({
    container: {
      backgroundColor: palette.primary.main,
      padding: `${spacing(2)}px ${spacing(2)}px`,
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
      paddingLeft: spacing(1),
      paddingRight: spacing(1),
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
      marginLeft: spacing(0.35),
      marginRight: spacing(0.35),
      fontSize: 28
    },
    alignRight: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-end'
    }
  });

function formatOrElse(cond: moment.Moment, format: string, onElse: string) {
  return cond ? cond.format(format) : onElse;
}

type ViewsType = typeof VIEWS;

interface IProps extends WithStyles<typeof styles> {
  selectedView: ViewsType[keyof ViewsType];
  startDate?: moment.Moment;
  endDate?: moment.Moment;
  selectViewOnClick: (evt: React.MouseEvent<HTMLElement>, view: ViewsType[keyof ViewsType]) => void;
}

const CalendarHeader: React.FunctionComponent<IProps> = ({
  classes,
  selectedView,
  selectViewOnClick,
  startDate = moment(),
  endDate = moment()
}) => (
  <div className={classes.container}>
    <div className={classes.dateContainer}>
      <CalendarHeaderButton
        variant="subtitle1"
        selected={selectedView === VIEWS.START_YEAR}
        onClick={_.partialRight(selectViewOnClick, VIEWS.START_YEAR)}
      >
        {formatOrElse(startDate, 'YYYY', '')}
      </CalendarHeaderButton>
      <CalendarHeaderButton
        variant="h5"
        selected={selectedView === VIEWS.START_DATE}
        onClick={_.partialRight(selectViewOnClick, VIEWS.START_DATE)}
      >
        {formatOrElse(startDate, 'MMM DD', 'Start')}
      </CalendarHeaderButton>
      <CalendarHeaderButton
        variant="h5"
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
        variant="subtitle1"
        selected={selectedView === VIEWS.END_YEAR}
        onClick={_.partialRight(selectViewOnClick, VIEWS.END_YEAR)}
      >
        {formatOrElse(endDate, 'YYYY', '')}
      </CalendarHeaderButton>
      <CalendarHeaderButton
        variant="h5"
        selected={selectedView === VIEWS.END_DATE}
        onClick={_.partialRight(selectViewOnClick, VIEWS.END_DATE)}
      >
        {formatOrElse(endDate, 'MMM DD', 'End')}
      </CalendarHeaderButton>
      <CalendarHeaderButton
        variant="h5"
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

export default withStyles(styles)(CalendarHeader);
