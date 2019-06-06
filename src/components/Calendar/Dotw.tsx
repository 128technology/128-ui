import * as _ from 'lodash';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as moment from 'moment';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';

const styles = ({ typography, palette, spacing }: Theme) =>
  createStyles({
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
  });

export interface IProps extends WithStyles<typeof styles> {
  format?: string;
}

export const Dotw: React.FunctionComponent<IProps> = ({ format, classes }) => (
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

Dotw.propTypes = {
  format: PropTypes.string
};

Dotw.defaultProps = {
  format: 'dd'
};

export default withStyles(styles)(Dotw);
