import _ from 'lodash';

export function getClosestKey(newKeys, prevKeys, originKey) {
  const originIndex = prevKeys.indexOf(originKey);
  const lastValueIndex = newKeys.length - 1;
  const index = originIndex !== -1 && lastValueIndex > -1 ? _.clamp(originIndex, 0, lastValueIndex) : null;

  return index !== null ? newKeys[index] : index;
}

export function differenceByKeys(sourceObj, keys) {
  const keyMap = _.keyBy(keys);
  return _.reduce(
    sourceObj,
    (acc, item, key) => {
      if (keyMap.hasOwnProperty(key)) {
        return acc;
      }

      return _.concat(acc, item);
    },
    []
  );
}

export function filterByKeys(sourceObj, keys) {
  return _.reduce(
    keys,
    (acc, key) => {
      return sourceObj.hasOwnProperty(key) ? _.concat(acc, sourceObj[key]) : acc;
    },
    []
  );
}

export function formatDataSource(dataSource, dataSourceConfig = {}) {
  return _.map(dataSource, datum => ({
    key: _.get(datum, dataSourceConfig.key, JSON.stringify(datum)),
    label: _.get(datum, dataSourceConfig.label, ''),
    value: _.get(datum, dataSourceConfig.value, null),
    originalDatum: datum
  }));
}
