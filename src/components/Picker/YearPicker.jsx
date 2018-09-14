import _ from 'lodash';
import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';

function getYearRange(minDate, maxDate) {
  const yearCount = maxDate.diff(minDate, 'year');
  return _.range(0, yearCount + 1).map(d => minDate.clone().add(d, 'years'));
}

class YearPicker extends React.Component {
  scrollToSelectedYear() {
    const node = findDOMNode(this.selectedYear);

    if (node && node.scrollIntoView) {
      node.parentNode.scrollTop = node.offsetTop - node.parentNode.clientHeight / 2 + node.clientHeight / 2;
    }
  }

  componentDidMount() {
    this.scrollToSelectedYear();
  }

  componentDidUpdate(prevProps) {
    const { date } = this.props;

    if (!prevProps.date.isSame(date)) {
      this.scrollToSelectedYear();
    }
  }

  render() {
    const { minDate, maxDate, format, classes, date, yearOnClick } = this.props;
    const yearRange = getYearRange(minDate, maxDate);

    return (
      <List className={classes.list}>
        {yearRange.map(d => (
          <ListItem
            ref={d.isSame(date, 'year') ? el => (this.selectedYear = el) : undefined}
            key={d.year()}
            className={classes.listButton}
            button={true}
            onClick={_.partialRight(yearOnClick, d)}
          >
            <Typography
              color={d.isSame(date, 'year') ? 'primary' : 'textPrimary'}
              variant={d.isSame(date, 'year') ? 'title' : 'button'}
            >
              {d.format(format)}
            </Typography>
          </ListItem>
        ))}
      </List>
    );
  }
}

YearPicker.propTypes = {
  minDate: PropTypes.instanceOf(moment),
  maxDate: PropTypes.instanceOf(moment),
  format: PropTypes.string
};

YearPicker.defaultProps = {
  minDate: moment().subtract(50, 'years'),
  maxDate: moment().add(50, 'years'),
  format: 'YYYY'
};

const enhance = withStyles(({ palette, typography, spacing }) => ({
  list: {
    height: 320,
    overflowY: 'auto'
  },
  listButton: {
    display: 'flex',
    justifyContent: 'center',
    color: palette.text.primary
  }
}));

export default enhance(YearPicker);
