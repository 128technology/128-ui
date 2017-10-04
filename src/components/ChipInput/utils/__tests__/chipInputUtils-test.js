import { expect } from 'chai';

import * as utils from '../chipInputUtils';

function removeAtIndex(arr, index) {
  const front = arr.slice(0, index);
  const back = arr.slice(index + 1, arr.length);
  return front.concat(back);
}

describe('Chip Input Utils', function() {
  describe('getClosestKey', function() {
    const keys = ['a', 'b', 'c'];

    it('should return the key to the left when removing the last key', function() {
      const newKeys = removeAtIndex(keys, 2);
      const closest = utils.getClosestKey(newKeys, keys, 'c');
      expect(closest).to.equal('b');
    });

    it('should return the key to the right when removing a key before the last', function() {
      const newKeys = removeAtIndex(keys, 1);
      const closest = utils.getClosestKey(newKeys, keys, 'b');
      expect(closest).to.equal('c');
    });

    it('should return the key to the right when removing the first key', function() {
      const newKeys = removeAtIndex(keys, 0);
      const closest = utils.getClosestKey(newKeys, keys, 'a');
      expect(closest).to.equal('b');
    });

    it('should return null when the key doesnt exist', function() {
      const newKeys = removeAtIndex(keys, 0);
      const closest = utils.getClosestKey(newKeys, keys, 'f');
      expect(closest).to.equal(null);
    });

    it('should return null when there are no more keys to choose from', function() {
      const closest = utils.getClosestKey([], keys, 'a');
      expect(closest).to.equal(null);
    });
  });

  describe('differenceByKeys', function() {
    const sourceObj = {
      a: 'a',
      b: 'b',
      c: 'c'
    };

    it('should take the difference between an object and a list of keys', function() {
      const keys = ['a', 'b'];
      const difference = utils.differenceByKeys(sourceObj, keys);
      expect(difference).to.deep.equal(['c']);
    });

    it('should return all data items when `keys` is empty', function() {
      const keys = [];
      const difference = utils.differenceByKeys(sourceObj, keys);
      expect(difference).to.deep.equal(['a', 'b', 'c']);
    });

    it('should return an empty array when the source object is empty', function() {
      const keys = ['a', 'b'];
      const difference = utils.differenceByKeys({}, keys);
      expect(difference).to.have.lengthOf(0);
    });
  });

  describe('filterByKeys', function() {
    const sourceObj = {
      a: 'a',
      b: 'b',
      c: 'c'
    };

    it('should return an array of items whose keys exist in an object', function() {
      const items = utils.filterByKeys(sourceObj, ['a', 'b']);
      expect(items).to.deep.equal(['a', 'b']);
    });

    it('should return an empty array when `keys` is empty', function() {
      const items = utils.filterByKeys(sourceObj, []);
      expect(items).to.have.lengthOf(0);
    });

    it('should return an empty array when no keys exist in the source object', function() {
      const items = utils.filterByKeys(sourceObj, ['f', 'e']);
      expect(items).to.have.lengthOf(0);
    });
  });

  describe('formatDataSource', function() {
    const data = [
      {
        key: 'some-key',
        label: 'some-label',
        value: 'some-value'
      },
      {
        key: 'some-other-key',
        label: 'some-other-label',
        value: 'some-other-value'
      }
    ];

    const config = {
      key: 'key',
      label: 'label',
      value: 'value'
    };

    it('should properly format data', function() {
      const formattedData = utils.formatDataSource(data, config);
      expect(formattedData).to.deep.equal([
        {
          key: 'some-key',
          label: 'some-label',
          value: 'some-value',
          originalDatum: {
            key: 'some-key',
            label: 'some-label',
            value: 'some-value'
          }
        },
        {
          key: 'some-other-key',
          label: 'some-other-label',
          value: 'some-other-value',
          originalDatum: {
            key: 'some-other-key',
            label: 'some-other-label',
            value: 'some-other-value'
          }
        }
      ]);
    });

    it('should properly format data with defaults', function() {
      const formattedData = utils.formatDataSource(data);
      expect(formattedData).to.deep.equal([
        {
          key: JSON.stringify(data[0]),
          label: '',
          value: null,
          originalDatum: {
            key: 'some-key',
            label: 'some-label',
            value: 'some-value'
          }
        },
        {
          key: JSON.stringify(data[1]),
          label: '',
          value: null,
          originalDatum: {
            key: 'some-other-key',
            label: 'some-other-label',
            value: 'some-other-value'
          }
        }
      ]);
    });
  });
});
