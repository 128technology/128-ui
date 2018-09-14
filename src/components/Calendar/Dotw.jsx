import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';

function Dotw({ format, classes }) {
  return (
    <div className={classes.dotwContainer}>
      {_.range(0, 7).map(d => (
        <div className={classes.dotw} key={d}>
          {moment()
            .day(d)
            .format(format)}
        </div>
      ))}
    </div>
  );
}

Dotw.propTypes = {
  format: PropTypes.string
};

Dotw.defaultProps = {
  format: 'dd'
};

const enhance = withStyles(({ typography, palette, spacing }) => ({
  dotwContainer: {
    display: 'flex',
    alignItems: 'center',
    color: palette.text.hint,
    fontFamily: typography.caption.fontFamily,
    fontSize: typography.caption.fontSize,
    fontWeight: 500
  },
  dotw: {
    width: 36,
    padding: `${spacing.unit}px 0`,
    textAlign: 'center'
  }
}));

export default enhance(Dotw);
