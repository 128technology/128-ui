import _ from 'lodash';

export function getClosestKey(newKeys, prevKeys, originKey) {
  const originIndex = prevKeys.indexOf(originKey);
  const lastValueIndex = newKeys.length - 1;
  const index = originIndex !== null && lastValueIndex > -1 ? _.clamp(originIndex, 0, lastValueIndex) : null;

  return index !== null ? newKeys[index] : index;
}

export function differenceByKeys(dataSourceMap, selectedKeys) {
  const keyMap = _.keyBy(selectedKeys);
  return _.reduce(
    dataSourceMap,
    (acc, item, key) => {
      if (keyMap.hasOwnProperty(key)) {
        return acc;
      }

      return _.concat(acc, item);
    },
    []
  );
}

export function filterByKeys(dataSourceMap, selectedKeys) {
  return _.reduce(
    selectedKeys,
    (acc, item) => {
      return _.concat(acc, dataSourceMap[item]);
    },
    []
  );
}

export function formatDataSource(dataSource, dataSourceConfig) {
  return _.map(dataSource, datum => ({
    key: _.get(datum, dataSourceConfig.key, JSON.stringify(datum)),
    label: _.get(datum, dataSourceConfig.label, ''),
    value: _.get(datum, dataSourceConfig.value, null),
    originalDatum: datum
  }));
}
