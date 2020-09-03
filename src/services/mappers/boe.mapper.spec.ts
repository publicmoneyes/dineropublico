import { Boe, defaultBoe } from '../../models';
import { boeMapper } from './boe.mapper';
import { BoeApiModel } from '../api-models';
import { Xml2JsonService } from '../xml2json.service';
import { readFileSync } from 'fs';

describe('Boe mapper specs', () => {
  let xmlService: Xml2JsonService = Xml2JsonService.getInstance();
  const basePath: string = './__mocks__/boe-xml';

  it('maps a default boe if the arguments are undefined', () => {
    // Arrange
    const expectedResult: Boe = defaultBoe();
    // Act
    const givenResult: Boe = boeMapper(undefined as any);
    // Assert
    expect(givenResult).toStrictEqual(expectedResult);
  });

  it('maps a default boe if the arguments are invalid', () => {
    // Arrange
    const expectedResult: Boe = defaultBoe();
    // Act
    const givenResult: Boe = boeMapper({ randomProp: 1 } as any);
    // Assert
    expect(givenResult).toStrictEqual(expectedResult);
  });

  it('maps a default boe if the XML is invalid', async () => {
    // Arrange
    let fileContent: string = readFileSync(`${basePath}/invalid-boe.xml`).toString('utf8');
    let parsedXml: BoeApiModel = await xmlService.parseXmlToJson(fileContent);
    const _defaultBoe: Boe = defaultBoe();
    // Act
    const boe: Boe = boeMapper(parsedXml);
    // Assert
    expect(_defaultBoe).toStrictEqual(boe);
  });

  it('maps a boe given a valid XML', async () => {
    // Arrange
    let fileContent: string = readFileSync(`${basePath}/20200831.xml`).toString('utf8');
    let parsedXml: BoeApiModel = await xmlService.parseXmlToJson(fileContent);
    const mockedBoe: Boe = {
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
    // Act
    const boe: Boe = boeMapper(parsedXml);
    // Assert
    expect(mockedBoe).toStrictEqual(boe);
  });
});
