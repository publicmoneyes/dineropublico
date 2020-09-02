import { BoeService } from './boe.service';
import { ajax, AjaxRequest } from 'rxjs/ajax';

// mock boe api
// need to mock 3 xml, one invalid, one valid and N valid
jest.mock('ajax');

describe('Boe Service specs', () => {
  let ajaxRequest: AjaxRequest;
  let boeService: BoeService = BoeService.getInstance();

  beforeEach(() => {
    // ajaxRequest = ajax();
  });

  it('returns empty Boe if not found', () => {});
  // it('throws error if date its less than 1/1/2020', () => {});
  // it('throws error if startDate its greater than endDate', () => {});
  // it('throws error if url its malformed', () => {});
  // it('get boe by date', () => {});
  // it('get boe by date range', () => {});
});
