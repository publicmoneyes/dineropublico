import { utils } from './utils-fns';

describe('Utils specs', () => {
  it('Creates a collection of dates given a range', () => {
    let dateStart: Date = new Date(Date.UTC(2020, 0, 1));
    let dateEnd: Date = new Date(Date.UTC(2020, 1, 1)); // inclusive

    let collection = utils.createDateCollection(dateStart, dateEnd);
    // 31 days of january + 1 february
    expect(collection).toHaveLength(32);
  });

  it('finds index in a collection', () => {
    // Arrange
    const keywordList = ['A', 'B', 'C', 'D'];
    const keyword = 'C';
    // Act
    let keywordIndex: number = utils.indexFinder(keywordList, keyword);
    // Assert
    expect(keywordIndex).toEqual(2);
  });
});
