import { DD } from '../services/api-models';
import { utils } from './utils-fns';

describe('Utils specs', () => {
  it('createDateCollection.Creates a collection of dates given a range', () => {
    let dateStart: Date = new Date(Date.UTC(2020, 0, 1));
    let dateEnd: Date = new Date(Date.UTC(2020, 1, 1)); // inclusive

    let collection = utils.createDateCollection(dateStart, dateEnd);
    // 31 days of january + 1 february
    expect(collection).toHaveLength(32);
  });

  it('indexFinder.finds index in a collection', () => {
    // Arrange
    const keywordList = ['A', 'B', 'C', 'D'];
    const keyword = 'C';
    // Act
    let keywordIndex: number = utils.indexFinder(keywordList, keyword);
    // Assert
    expect(keywordIndex).toEqual(2);
  });

  it('normalizeString.Removes characters by a given regular expression', () => {
    // Arrange
    const str = 'ab1_.';
    const regexp = new RegExp(/[a-z\._]/g);
    // Assert
    expect(utils.normalizeString(str, regexp)).toEqual('1');
  });

  it('safeAcess.returns an empty string if the property doent exist', () => {
    const collection: DD = [];

    expect(utils.safeAccess(collection, 0)).toEqual('');
    expect(utils.safeAccess(collection, 1)).toEqual('');
    expect(utils.safeAccess(collection, -1)).toEqual('');
  });

  it('safeAcess.returns the value in the collection', () => {
    const collection: DD = ['value'];

    expect(utils.safeAccess(collection, 0)).toEqual('value');
  });

  it('isDistinctMinusOne', () => {
    expect(utils.isDistinctMinusOne(1)).toBeTruthy();
    expect(utils.isDistinctMinusOne(-1)).toBeFalsy();
  });

  it('findItemIndex. returns -1 if the item is not in the collection', () => {
    const collection: string[] = ['value'];

    expect(utils.findItemIndex('', collection, '')).toBe(-1);
    expect(utils.findItemIndex('value', collection, 'somekey')).toBe(-1);
  });

  it('findItemIndex. returns the index of the given item in a collection', () => {
    const collection: string[] = ['value'];
    expect(utils.findItemIndex('value', collection, 'value')).toBe(0);
  });

  it('getItemIndex. given a collection of indexes return its content', () => {
    expect(utils.getItemIndex([1])).toBe(1);
  });

  it('getItemIndex. returns -1 if its empty', () => {
    expect(utils.getItemIndex([])).toBe(-1);
  });
});
