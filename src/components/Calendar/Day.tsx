import * as React from 'react';
import * as moment from 'moment';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import { withStyles, Theme, WithStyles, createStyles } from '@material-ui/core/styles';
import { Colors } from './Calendar';

const styles = ({ palette, typography }: Theme) =>
  createStyles({
    day: {
      height: 36,
      width: 36,
      fontSize: typography.caption.fontSize,
      fontWeight: 500,
      color: palette.text.primary
    },
    outsideOfMonth: {
      opacity: 0
    },
    selected: ({ color }: IProps) => ({
      color: palette[color].contrastText,
      backgroundColor: palette[color].main,
      '&:hover': {
        backgroundColor: palette[color].dark
      }
    })
  });

export interface IProps {
  color: Colors;
  date?: moment.Moment;
  inCurrentMonth?: boolean;
  disabled?: boolean;
  selected?: boolean;
  renderer?: (date: moment.Moment, props: IProps, symbol: React.ReactNode) => JSX.Element;
}

type Props = IProps & WithStyles<typeof styles>;

export const Day: React.SFC<Props> = props => {
  const { date = moment(), classes, inCurrentMonth, renderer, disabled, selected } = props;
  const dayClasses = classNames(classes.day, !inCurrentMonth && classes.outsideOfMonth, selected && classes.selected);

  const symbol = (
    <IconButton className={dayClasses} disabled={disabled}>
      {date.format('D')}
    </IconButton>
  );

  if (renderer) {
    return renderer(date, props, symbol);
  }

  return symbol;
};

export default withStyles(styles)(Day);
