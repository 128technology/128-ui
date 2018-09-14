import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

class Day extends React.Component {
  render() {
    const { date, classes, inCurrentMonth, renderer, props, disabled, selected } = this.props;
    const dayClasses = classNames(classes.day, !inCurrentMonth && classes.outsideOfMonth, selected && classes.selected);

    const symbol = (
      <IconButton className={dayClasses} disabled={disabled} {...props}>
        {date.format('D')}
      </IconButton>
    );

    if (renderer) {
      return renderer(date, this.props, symbol);
    }

    return symbol;
  }
}

Day.propTypes = {
  date: PropTypes.instanceOf(moment),
  classes: PropTypes.object,
  inCurrentMonth: PropTypes.bool,
  renderer: PropTypes.func,
  props: PropTypes.object,
  disabled: PropTypes.bool,
  selected: PropTypes.bool
};

const enhance = withStyles(({ palette, typography }) => ({
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
  selected: {
    color: palette.primary.contrastText,
    backgroundColor: palette.primary.main,
    '&:hover': {
      backgroundColor: palette.primary.dark
    }
  }
}));

export default enhance(Day);
