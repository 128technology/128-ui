import * as React from 'react';
import * as moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';

const styles = createStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  iconButton: {
    '&:hover': {
      backgroundColor: 'transparent'
    }
  }
});

export interface IProps extends WithStyles<typeof styles> {
  date?: moment.Moment;
  format?: string;
  prevMonthOnClick?: (e: React.MouseEvent<HTMLElement>) => void;
  nextMonthOnClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const CalendarController: React.FunctionComponent<IProps> = ({
  date = moment(),
  format = 'MMMM YYYY',
  classes,
  prevMonthOnClick,
  nextMonthOnClick
}) => {
  return (
    <div className={classes.container}>
      <IconButton className={classes.iconButton} onClick={prevMonthOnClick}>
        <i className="mdi mdi-chevron-left" />
      </IconButton>
      <Typography align="center" variant="body1">
        {date.format(format)}
      </Typography>
      <IconButton className={classes.iconButton} onClick={nextMonthOnClick}>
        <i className="mdi mdi-chevron-right" />
      </IconButton>
    </div>
  );
};

export default withStyles(styles)(CalendarController);
