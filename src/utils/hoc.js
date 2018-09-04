import _ from 'lodash';
import Immutable from 'immutable';
import { shouldUpdate } from 'recompose';

/**
 * Similar to Recompose's onlyUpdateForKeys except that instead of shallowEqual, we
 * leverage immutablejs' "is" comparison to cover immutable and non-immutable objects.
 * @param propKeys A list of prop keys
 */
export function shouldUpdateForProps(propKeys) {
  return shouldUpdate((props, nextProps) => _.some(propKeys, key => !Immutable.is(nextProps[key], props[key])));
}

/**
 * Similar to Recompose's onlyUpdateForPropTypes except that instead of shallowEqual, we
 * leverage immutablejs' "is" comparison to cover immutable and non-immutable objects.
 */
export function onlyUpdateForPropTypes(Component) {
  const propTypes = Component.propTypes;
  const propKeys = Object.keys(propTypes || {});
  return shouldUpdateForProps(propKeys)(Component);
}
