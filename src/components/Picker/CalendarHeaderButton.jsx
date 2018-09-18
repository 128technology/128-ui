import React from 'react';
import PropTypes from 'prop-types';
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

CalendarHeaderButton.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  selected: PropTypes.bool
};

CalendarHeaderButton.defaultProps = {
  classes: {},
  selected: false
};

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
