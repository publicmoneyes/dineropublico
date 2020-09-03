import { readFileSync } from 'fs';
import { of, Observable } from 'rxjs';
import { mocked } from 'ts-jest/utils';
import { BoeService } from './boe.service';
import { DateService } from './date.service';
import { BOE_BASE_URL, BOE_API } from '../lib';
import { ajax, AjaxResponse, AjaxRequest } from 'rxjs/ajax';
import { defaultBoe, CustomError, createError, Boe } from '../models';

jest.mock('rxjs/ajax');
const mockedAjax = mocked(ajax, true);

describe('Boe Service specs', () => {
  const basePath: string = './__mocks__/boe-xml';
  let boeService: BoeService = BoeService.getInstance();
  let dateService: DateService = DateService.getInstance();
  let fileContentAsXml: string;

  beforeEach(() => {
    mockedAjax.mockClear();
  });

  describe('Boe service single requests', () => {
    it('returns empty Boe if not found', (done) => {
      // Arrange
      fileContentAsXml = readFileSync(`${basePath}/invalid-boe.xml`).toString('utf8');
      let ajaxResponse: Observable<AjaxResponse> = of({ response: fileContentAsXml } as AjaxResponse);
      mockedAjax.mockReturnValue(ajaxResponse);
      let sampleDate: Date = new Date(Date.UTC(2020, 7, 30)); // Invalid date, its sunday. Sundays we have no BOE emissions.
      let urlCalled: string = `${BOE_BASE_URL}/${BOE_API}?id=BOE-S-${dateService.toBoeFormat(sampleDate)}`;

      // Act
      boeService.findBoeByDate(sampleDate).subscribe((mappedBoe) => {
        // Assert
        let mockedUrlCall = (mockedAjax.mock.calls[0][0] as AjaxRequest).url;

        expect(mappedBoe).toStrictEqual(defaultBoe());
        expect(mockedUrlCall).toEqual(urlCalled);
        expect(mockedAjax.mock.calls).toHaveLength(1);
        done();
      });
    });

    it('throws error if date is undefined', (done) => {
      // Arrange
      let date: Date | unknown = undefined;
      let expectedError: CustomError = createError('Invalid date', 400);

      // Act
      boeService.findBoeByDate(date as Date).subscribe(
        (succ) => {
          fail('Expected error');
        },
        (err) => {
          // Assert
          expect(err).toEqual(expectedError);
          done();
        }
      );
    });

    it('throws error if date its less than 1/1/2020', (done) => {
      // Arrange
      let date: Date = new Date(Date.UTC(2019, 5, 5));
      let expectedError: CustomError = createError('Invalid date', 400);

      // Act
      boeService.findBoeByDate(date as Date).subscribe(
        (succ) => {
          fail('Expected error');
        },
        (err) => {
          // Assert
          expect(err).toEqual(expectedError);
          done();
        }
      );
    });

    it('get boe by date', (done) => {
      // Arrange
      const date: Date = new Date(Date.UTC(2020, 7, 31));
      const urlCalled: string = `${BOE_BASE_URL}/${BOE_API}?id=BOE-S-${dateService.toBoeFormat(date)}`;
      const expectedResponse: Boe = {
        contractIdCollection: [
          'BOE-B-2020-27644',
          'BOE-B-2020-27645',
          'BOE-B-2020-27646',
          'BOE-B-2020-27647',
          'BOE-B-2020-27648',
          'BOE-B-2020-27649',
          'BOE-B-2020-27650',
          'BOE-B-2020-27651',
          'BOE-B-2020-27652',
          'BOE-B-2020-27653',
          'BOE-B-2020-27654',
          'BOE-B-2020-27655',
          'BOE-B-2020-27656',
          'BOE-B-2020-27657',
          'BOE-B-2020-27659',
          'BOE-B-2020-27660',
          'BOE-B-2020-27661',
          'BOE-B-2020-27662',
          'BOE-B-2020-27663',
          'BOE-B-2020-27664',
          'BOE-B-2020-27665',
          'BOE-B-2020-27667',
          'BOE-B-2020-27668',
          'BOE-B-2020-27669',
          'BOE-B-2020-27670',
          'BOE-B-2020-27671',
          'BOE-B-2020-27672',
          'BOE-B-2020-27677',
          'BOE-B-2020-27678',
          'BOE-B-2020-27679',
          'BOE-B-2020-27681',
          'BOE-B-2020-27682',
          'BOE-B-2020-27683',
        ],
      };
      fileContentAsXml = readFileSync(`${basePath}/20200831.xml`).toString('utf8');
      const ajaxResponse: Observable<AjaxResponse> = of({ response: fileContentAsXml } as AjaxResponse);
      mockedAjax.mockReturnValue(ajaxResponse);

      // Act
      boeService.findBoeByDate(date).subscribe((mappedBoe) => {
        let mockedUrlCall = (mockedAjax.mock.calls[0][0] as AjaxRequest).url;

        expect(mappedBoe).toStrictEqual(expectedResponse);
        expect(mappedBoe.contractIdCollection).toHaveLength(33);
        expect(mockedUrlCall).toEqual(urlCalled);
        expect(mockedAjax.mock.calls).toHaveLength(1);

        done();
      });
    });
  });

  describe('Boe service date range requests', () => {
    it('throws error if one of the dates are undefined', (done) => {
      // Arrange
      let date: Date | unknown = undefined;
      let expectedError: CustomError = createError('Invalid date', 400);

      // Act
      boeService.findBoeByDateRange(date as Date, new Date()).subscribe(
        (succ) => {
          fail('Expected error');
        },
        (err) => {
          // Assert
          expect(err).toEqual(expectedError);
          done();
        }
      );
    });

    it('throws error if startDate its greater than endDate', (done) => {
      // Arrange
      let dateStart: Date = new Date(Date.UTC(2020, 5, 5));
      let dateEnd: Date = new Date(Date.UTC(2020, 4, 5));
      let expectedError: CustomError = createError('Invalid date', 400);

      // Act
      boeService.findBoeByDateRange(dateStart, dateEnd).subscribe(
        (succ) => {
          fail('Expected error');
        },
        (err) => {
          // Assert
          expect(err).toEqual(expectedError);
          done();
        }
      );
    });

    it('get boe by date range', (done) => {
      // Arrange
      let startDate: Date = new Date(Date.UTC(2020, 7, 31));
      let endDate: Date = new Date(Date.UTC(2020, 8, 1));
      const expectedResponse: Boe = {
        contractIdCollection: [
          'BOE-B-2020-27644',
          'BOE-B-2020-27645',
          'BOE-B-2020-27646',
          'BOE-B-2020-27647',
          'BOE-B-2020-27648',
          'BOE-B-2020-27649',
          'BOE-B-2020-27650',
          'BOE-B-2020-27651',
          'BOE-B-2020-27652',
          'BOE-B-2020-27653',
          'BOE-B-2020-27654',
          'BOE-B-2020-27655',
          'BOE-B-2020-27656',
          'BOE-B-2020-27657',
          'BOE-B-2020-27659',
          'BOE-B-2020-27660',
          'BOE-B-2020-27661',
          'BOE-B-2020-27662',
          'BOE-B-2020-27663',
          'BOE-B-2020-27664',
          'BOE-B-2020-27665',
          'BOE-B-2020-27667',
          'BOE-B-2020-27668',
          'BOE-B-2020-27669',
          'BOE-B-2020-27670',
          'BOE-B-2020-27671',
          'BOE-B-2020-27672',
          'BOE-B-2020-27677',
          'BOE-B-2020-27678',
          'BOE-B-2020-27679',
          'BOE-B-2020-27681',
          'BOE-B-2020-27682',
          'BOE-B-2020-27683',
          'BOE-B-2020-27777',
          'BOE-B-2020-27778',
          'BOE-B-2020-27779',
          'BOE-B-2020-27782',
          'BOE-B-2020-27784',
          'BOE-B-2020-27785',
          'BOE-B-2020-27786',
          'BOE-B-2020-27787',
          'BOE-B-2020-27791',
          'BOE-B-2020-27802',
          'BOE-B-2020-27804',
          'BOE-B-2020-27805',
          'BOE-B-2020-27806',
          'BOE-B-2020-27807',
          'BOE-B-2020-27809',
        ],
      };

      let august31Xml = readFileSync(`${basePath}/20200831.xml`).toString('utf8');
      let ajaxResponseAugust: Observable<AjaxResponse> = of({ response: august31Xml } as AjaxResponse);
      mockedAjax.mockReturnValueOnce(ajaxResponseAugust);

      let september1Xml = readFileSync(`${basePath}/20200901.xml`).toString('utf8');
      let ajaxResponseSeptember: Observable<AjaxResponse> = of({ response: september1Xml } as AjaxResponse);
      mockedAjax.mockReturnValueOnce(ajaxResponseSeptember);

      // Act
      boeService.findBoeByDateRange(startDate, endDate).subscribe((r) => {
        expect(r).toEqual(expectedResponse);
        expect(r.contractIdCollection).toHaveLength(48);
        done();
      });
    });
  });
});
