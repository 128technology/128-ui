import _ from 'lodash';
import Immutable from 'immutable';

export const RowSelection = Immutable.Record({
  selectorType: null,
  onSelect: () => {},
  rowIsSelected: () => false,
  onSelectAll: () => {}
});

export function defaultRowKey(x) {
  return x._id || x.id || x.key || JSON.stringify(_.isFunction(x.toJS) ? x.toJS() : x);
}
