import { createDateCollection } from './utils-fns';

describe('Utils specs', () => {
  it('Created a collection of dates given a range', () => {
    let dateStart: Date = new Date(Date.UTC(2020, 0, 1));
    let dateEnd: Date = new Date(Date.UTC(2020, 1, 1)); // inclusive

    let collection = createDateCollection(dateStart, dateEnd);
    // 31 days of january + 1 february
    expect(collection).toHaveLength(32);
  });
});
