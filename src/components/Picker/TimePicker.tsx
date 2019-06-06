import * as _ from 'lodash';
import * as React from 'react';
import * as moment from 'moment';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';

import PickerList, { IProps as PickerListProps } from './PickerList';

const styles = createStyles({
  container: {
    display: 'flex'
  },
  list: {
    width: '50%',
    boxSizing: 'border-box'
  }
});

export interface IProps extends WithStyles<typeof styles> {
  date?: moment.Moment;
  minuteFormat?: PickerListProps['format'];
  hourFormat?: PickerListProps['format'];
  hourOnClick?: PickerListProps['itemOnClick'];
  minuteOnClick?: PickerListProps['itemOnClick'];
  disableDate?: PickerListProps['disabled'];
}

const TimePicker: React.FunctionComponent<IProps> = ({
  classes,
  date = moment(),
  minuteOnClick = _.noop,
  hourOnClick = _.noop,
  hourFormat = 'HH',
  minuteFormat = 'mm',
  disableDate
}) => {
  const hourRange = getHourRange(date);
  const minuteRange = getMinuteRange(date);

  return (
    <div className={classes.container}>
      <PickerList
        className={classes.list}
        selected={d => d.hour() === date.hour()}
        itemOnClick={hourOnClick}
        data={hourRange}
        format={hourFormat}
        disabled={disableDate}
      />
      <PickerList
        className={classes.list}
        selected={d => d.minute() === date.minute()}
        itemOnClick={minuteOnClick}
        data={minuteRange}
        format={minuteFormat}
        disabled={disableDate}
      />
    </div>
  );
};

function getHourRange(date: moment.Moment) {
  const now = date.clone().startOf('day');
  return _.range(0, 24).map(x => now.clone().add(x, 'hour'));
}

function getMinuteRange(date: moment.Moment) {
  const now = date.clone().startOf('hour');
  return _.range(0, 60).map(x => now.clone().add(x, 'minute'));
}

export default withStyles(styles)(TimePicker);
