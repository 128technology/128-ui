import * as React from 'react';
import * as classNames from 'classnames';
import * as moment from 'moment';
import { withStyles, Theme, WithStyles } from '@material-ui/core/styles';

import { Colors } from './Picker';

interface IProps {
  date: moment.Moment;
  startDate?: moment.Moment;
  endDate?: moment.Moment;
  color: Colors;
  dayProps?: {
    selected?: boolean;
    inCurrentMonth?: boolean;
    disabled?: boolean;
  };
  onClick?: (e: React.MouseEvent<HTMLElement>, date: moment.Moment) => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLElement>, date: moment.Moment) => void;
}

type Props = IProps & WithStyles<typeof styles>;

const styles = ({ palette, shape }: Theme) => ({
  betweenDate: ({ color }: IProps) => ({
    height: 36,
    width: 36,
    backgroundColor: palette[color].light
  }),
  leftEndCap: {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%'
  },
  rightEndCap: {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%'
  },
  weekStartCap: {
    borderTopLeftRadius: shape.borderRadius,
    borderBottomLeftRadius: shape.borderRadius
  },
  weekEndCap: {
    borderTopRightRadius: shape.borderRadius,
    borderBottomRightRadius: shape.borderRadius
  }
});

class CalendarDay extends React.Component<Props> {
  public render() {
    const { dayProps = {}, children, date, startDate, endDate, classes } = this.props;
    const betweenDate =
      startDate && endDate && date.isAfter(startDate) && date.isBefore(endDate.clone().startOf('day'));
    const endCap = startDate && endDate && dayProps.selected && !startDate.isSame(endDate, 'day');
    const weekStartCap = betweenDate && date.day() === 0;
    const weekEndCap = betweenDate && date.day() === 6;

    return (
      <div
        className={classNames({
          [classes.betweenDate]: (betweenDate || endCap) && dayProps.inCurrentMonth,
          [classes.leftEndCap]: startDate && endCap && date.isSame(startDate, 'day'),
          [classes.rightEndCap]: endDate && endCap && date.isSame(endDate, 'day'),
          [classes.weekStartCap]: weekStartCap,
          [classes.weekEndCap]: weekEndCap
        })}
        onClick={this.handleDayOnClick}
        onMouseEnter={this.handleDayOnMouseEnter}
      >
        {children}
      </div>
    );
  }

  private handleDayOnClick = (e: React.MouseEvent<HTMLElement>) => {
    const { dayProps = {}, date, onClick } = this.props;

    if (onClick && !dayProps.disabled) {
      onClick(e, date);
    }
  };

  private handleDayOnMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const { dayProps = {}, date, onMouseEnter } = this.props;

    if (onMouseEnter && !dayProps.disabled) {
      onMouseEnter(e, date);
    }
  };
}

export default withStyles(styles)(CalendarDay);
