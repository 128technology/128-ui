import * as React from 'react';
import * as classNames from 'classnames';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';

const styles = ({ palette }: Theme) =>
  createStyles({
    base: {
      color: 'rgba(255, 255, 255, 0.66)',
      cursor: 'pointer'
    },
    selected: {
      color: palette.primary.contrastText
    }
  });

export interface IProps
  extends WithStyles<typeof styles>,
    Pick<TypographyProps, Exclude<keyof TypographyProps, 'classes'>> {
  className?: string;
  selected?: boolean;
}

const CalendarHeaderButton: React.FunctionComponent<IProps> = ({ className, classes, children, selected, ...rest }) => (
  <Typography {...rest} className={classNames(className, classes.base, { [classes.selected]: selected })}>
    {children}
  </Typography>
);

export default withStyles(styles)(CalendarHeaderButton);
