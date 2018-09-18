import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import classNames from 'classnames';
import { findDOMNode } from 'react-dom';
import { withStyles } from '@material-ui/core/styles';

import PickerListItem from './PickerListItem';

class PickerList extends React.Component {
  scrollToSelectedYear() {
    const node = findDOMNode(this.selectedYear);

    if (node && node.scrollIntoView) {
      node.parentNode.scrollTop = node.offsetTop - node.parentNode.clientHeight / 2 + node.clientHeight / 2;
    }
  }

  componentDidMount() {
    this.scrollToSelectedYear();
  }

  componentDidUpdate() {
    this.scrollToSelectedYear();
  }

  render() {
    const { data, classes, format, selected, itemOnClick, className } = this.props;

    return (
      <List className={classNames(className, classes.list)}>
        {data.map(d => (
          <PickerListItem
            ref={selected(d) ? el => (this.selectedYear = el) : undefined}
            key={d}
            selected={selected(d)}
            date={d}
            onClick={itemOnClick}
          >
            {d.format(format)}
          </PickerListItem>
        ))}
      </List>
    );
  }
}

PickerList.propTypes = {
  data: PropTypes.array,
  classes: PropTypes.object,
  format: PropTypes.string,
  selected: PropTypes.bool,
  itemOnClick: PropTypes.func,
  className: PropTypes.string
};

PickerList.defaultProps = {
  data: [],
  classes: {},
  format: ''
};

const enhance = withStyles(({ palette, typography, spacing }) => ({
  list: {
    height: 320,
    overflowY: 'auto'
  }
}));

export default enhance(PickerList);
