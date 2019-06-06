import * as moment from 'moment';
import { expect } from 'chai';

import { inCurrentMonth } from '../Week';

describe('Week', () => {
  describe('inCurrentMonth', () => {
    it('should return true for a day within the current month', () => {
      const month = moment('2018-09-18T15:38:19.451Z');
      const date = moment('2018-09-20T15:38:19.451Z');
      expect(inCurrentMonth(month, date)).to.equal(true);
    });

    it('should return false for a day outside of the current month', () => {
      const month = moment('2018-09-18T15:38:19.451Z');
      const date = moment('2018-08-20T15:38:19.451Z');
      expect(inCurrentMonth(month, date)).to.equal(false);
    });
  });
});
