import * as React from 'react';
import * as classNames from 'classnames';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Colors } from './Picker';

export interface IProps extends Pick<TypographyProps, Exclude<keyof TypographyProps, 'classes'>> {
  className?: string;
  selected?: boolean;
  color?: Colors;
}

type Props = IProps & WithStyles<typeof styles>;

const styles = ({ palette, shape, spacing }: Theme) =>
  createStyles({
    base: {
      color: 'rgba(255, 255, 255, 0.66)',
      cursor: 'pointer',
      whiteSpace: 'nowrap'
    },
    selected: ({ color = 'primary' }: IProps) => ({
      color: palette[color].contrastText
    }),
    buttonBaseSelected: {
      backgroundColor: 'rgba(0, 0, 0, 0.16)'
    },
    buttonBase: {
      padding: spacing(0, 0.5),
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.16)',
        borderRadius: shape.borderRadius
      }
    }
  });

const CalendarHeaderButton: React.FunctionComponent<Props> = ({
  className,
  classes,
  children,
  selected,
  color = 'primary',
  ...rest
}) => (
  <ButtonBase className={classNames(selected && classes.buttonBaseSelected, classes.buttonBase)}>
    <Typography {...rest} className={classNames(className, classes.base, { [classes.selected]: selected })}>
      {children}
    </Typography>
  </ButtonBase>
);

export default withStyles(styles)(CalendarHeaderButton);
