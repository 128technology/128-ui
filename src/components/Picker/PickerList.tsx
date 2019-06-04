import * as _ from 'lodash';
import * as React from 'react';
import * as classNames from 'classnames';
import * as ReactDOM from 'react-dom';
import * as moment from 'moment';
import List from '@material-ui/core/List';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';

import PickerListItem from './PickerListItem';

const styles = createStyles({
  list: {
    height: 320,
    overflowY: 'auto'
  }
});

export interface IProps extends WithStyles<typeof styles> {
  disabled?: (date: moment.Moment) => boolean;
  className?: string;
  format?: string;
  data: ReadonlyArray<moment.Moment>;
  selected: (time: moment.Moment) => boolean;
  itemOnClick?: (e: React.MouseEvent<HTMLElement>, date: moment.Moment) => void;
}

const PickerList: React.FunctionComponent<IProps> = ({
  data,
  classes,
  format = '',
  selected,
  itemOnClick,
  className,
  disabled
}) => {
  const selectedYear = React.createRef<HTMLElement>();

  React.useEffect(() => {
    if (!selectedYear.current) {
      return;
    }

    const node = ReactDOM.findDOMNode(selectedYear.current);
    if (node && node.parentElement && 'clientHeight' in node) {
      node.parentElement.scrollTop =
        _.get(node, 'offsetTop', 0) - node.parentElement.clientHeight / 2 + node.clientHeight / 2;
    }
  });

  return (
    <List className={classNames(className, classes.list)}>
      {data.map(d => (
        <PickerListItem
          innerRef={selected(d) ? selectedYear : undefined}
          key={d.toString()}
          selected={selected(d)}
          disabled={_.isFunction(disabled) && disabled(d)}
          date={d}
          onClick={itemOnClick}
        >
          {d.format(format)}
        </PickerListItem>
      ))}
    </List>
  );
};

export default withStyles(styles)(PickerList);
