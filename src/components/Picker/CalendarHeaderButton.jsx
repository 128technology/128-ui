import React from 'react';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

function CalendarHeaderButton({ className, classes, children, selected, ...rest }) {
  return (
    <Typography {...rest} className={classNames(className, classes.base, { [classes.selected]: selected })}>
      {children}
    </Typography>
  );
}

const enhance = withStyles(({ palette }) => ({
  base: {
    color: 'rgba(255, 255, 255, 0.66)',
    cursor: 'pointer'
  },
  selected: {
    color: palette.primary.contrastText
  }
}));

export default enhance(CalendarHeaderButton);
