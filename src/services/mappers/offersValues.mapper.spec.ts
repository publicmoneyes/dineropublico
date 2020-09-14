import { Xml2JsonService } from '..';
import { readFileSync } from 'fs';
import { ContractApiModel } from '../api-models';
import { defaultOfferValue, OffersValues } from '../../models';
import { offersValuesMapper } from './offersValues.mapper';

describe('Offer values specs', () => {
  const basePath: string = './__mocks__/contracts-xml';
  const xmlService: Xml2JsonService = Xml2JsonService.getInstance();

  it('maps default offerValues if the input its invalid', async () => {
    // Arrange
    let fileContent: string = readFileSync(`${basePath}/20209754.xml`).toString('utf8');
    let parsedXml: ContractApiModel = await xmlService.parseXmlToJson(fileContent);

    // Act
    parsedXml.documento.texto = []; // Make invalid
    let offersValue: OffersValues[] = offersValuesMapper(parsedXml);
    // Assert
    expect(offersValue).toStrictEqual([defaultOfferValue()]);
  });

  it('maps a single offers values ', async () => {
    // Arrange
    let fileContent: string = readFileSync(`${basePath}/202013138.xml`).toString('utf8');
    let parsedXml: ContractApiModel = await xmlService.parseXmlToJson(fileContent);
    let mockedOffers: OffersValues[] = [{ text: 'Valor de la oferta seleccionada', value: 4300000 }];
    // Act
    let metadata = offersValuesMapper(parsedXml);
    // Assert
    expect(metadata).toStrictEqual(mockedOffers);
  });

  it('maps multiple offers values (nested sample 1)', async () => {
    // Arrange
    let fileContent: string = readFileSync(`${basePath}/20209754.xml`).toString('utf8');
    let parsedXml: ContractApiModel = await xmlService.parseXmlToJson(fileContent);
    let mockedOffers: OffersValues[] = [
      { text: 'Lote 1', value: 21652.89 },
      {
        text: 'Lote 1',
        value: 466280.99,
      },
      {
        text: 'Lote 1',
        value: 65950.41,
      },
      {
        text: 'Lote 1',
        value: 646611.57,
      },
      {
        text: 'Lote 1',
        value: 466280.99,
      },
      {
        text: 'Lote 1',
        value: 57685.95,
      },
      {
        text: 'Lote 1',
        value: 466280.99,
      },
      {
        text: 'Lote 1',
        value: 847438.02,
      },
      {
        text: 'Lote 1',
        value: 532231.4,
      },
      {
        text: 'Lote 1',
        value: 847438.02,
      },
      {
        text: 'Lote 1',
        value: 20826.45,
      },
      {
        text: 'Lote 1',
        value: 847438.02,
      },
      {
        text: 'Lote 1',
        value: 575041.32,
      },
      {
        text: 'Lote 1',
        value: 792231.4,
      },
      {
        text: 'Lote 1',
        value: 847438.02,
      },
      {
        text: 'Lote 1',
        value: 55206.61,
      },
      {
        text: 'Lote 1',
        value: 65950.41,
      },
      {
        text: 'Lote 1',
        value: 137851.24,
      },
      {
        text: 'Lote 1',
        value: 532231.4,
      },
      {
        text: 'Lote 1',
        value: 847438.02,
      },
      {
        text: 'Lote 1',
        value: 532231.4,
      },
      {
        text: 'Lote 1',
        value: 604132.23,
      },
      {
        text: 'Lote 1',
        value: 847438.02,
      },
      {
        text: 'Lote 1',
        value: 604132.23,
      },
      {
        text: 'Lote 1',
        value: 466280.99,
      },
      {
        text: 'Lote 1',
        value: 466280.99,
      },
      {
        text: 'Lote 1',
        value: 65950.41,
      },
      {
        text: 'Lote 1',
        value: 847438.02,
      },
      {
        text: 'Lote 1',
        value: 792231.4,
      },
      {
        text: 'Lote 1',
        value: 532231.4,
      },
      {
        text: 'Lote 1',
        value: 532231.4,
      },
      {
        text: 'Lote 1',
        value: 589917.36,
      },
      {
        text: 'Lote 1',
        value: 20826.45,
      },
      {
        text: 'Lote 1',
        value: 57685.95,
      },
      {
        text: 'Lote 1',
        value: 589917.36,
      },
      {
        text: 'Lote 1',
        value: 137851.24,
      },
      {
        text: 'Lote 1',
        value: 847438.02,
      },
      {
        text: 'Lote 1',
        value: 532231.4,
      },
      {
        text: 'Lote 2',
        value: 9338.84,
      },
      {
        text: 'Lote 2',
        value: 260413.22,
      },
      {
        text: 'Lote 2',
        value: 46280.99,
      },
      {
        text: 'Lote 2',
        value: 4297.52,
      },
      {
        text: 'Lote 2',
        value: 260413.22,
      },
      {
        text: 'Lote 2',
        value: 234380.17,
      },
      {
        text: 'Lote 2',
        value: 41983.47,
      },
      {
        text: 'Lote 2',
        value: 43057.85,
      },
      {
        text: 'Lote 2',
        value: 157107.44,
      },
      {
        text: 'Lote 2',
        value: 114049.59,
      },
      {
        text: 'Lote 2',
        value: 43057.85,
      },
      {
        text: 'Lote 2',
        value: 166446.28,
      },
      {
        text: 'Lote 2',
        value: 9338.84,
      },
      {
        text: 'Lote 3',
        value: 3305.79,
      },
      {
        text: 'Lote 3',
        value: 313884.3,
      },
      {
        text: 'Lote 3',
        value: 137438.02,
      },
      {
        text: 'Lote 3',
        value: 137438.02,
      },
      {
        text: 'Lote 3',
        value: 16859.5,
      },
      {
        text: 'Lote 3',
        value: 137438.02,
      },
      {
        text: 'Lote 3',
        value: 313884.3,
      },
      {
        text: 'Lote 3',
        value: 313884.3,
      },
      {
        text: 'Lote 3',
        value: 69256.2,
      },
      {
        text: 'Lote 3',
        value: 313884.3,
      },
      {
        text: 'Lote 3',
        value: 313884.3,
      },
      {
        text: 'Lote 3',
        value: 3305.79,
      },
      {
        text: 'Lote 3',
        value: 313884.3,
      },
      {
        text: 'Lote 3',
        value: 197603.31,
      },
      {
        text: 'Lote 3',
        value: 283719.01,
      },
      {
        text: 'Lote 3',
        value: 30165.29,
      },
      {
        text: 'Lote 3',
        value: 65950.41,
      },
      {
        text: 'Lote 3',
        value: 272809.92,
      },
      {
        text: 'Lote 3',
        value: 313884.3,
      },
      {
        text: 'Lote 3',
        value: 65950.41,
      },
      {
        text: 'Lote 3',
        value: 174462.81,
      },
      {
        text: 'Lote 3',
        value: 174462.81,
      },
      {
        text: 'Lote 3',
        value: 137438.02,
      },
      {
        text: 'Lote 3',
        value: 283719.01,
      },
      {
        text: 'Lote 3',
        value: 37024.79,
      },
      {
        text: 'Lote 3',
        value: 137438.02,
      },
      {
        text: 'Lote 3',
        value: 313884.3,
      },
      {
        text: 'Lote 3',
        value: 283719.01,
      },
      {
        text: 'Lote 3',
        value: 16859.5,
      },
      {
        text: 'Lote 3',
        value: 283719.01,
      },
      {
        text: 'Lote 3',
        value: 206694.21,
      },
      {
        text: 'Lote 4',
        value: 130991.74,
      },
      {
        text: 'Lote 4',
        value: 12396.69,
      },
      {
        text: 'Lote 4',
        value: 130991.74,
      },
      {
        text: 'Lote 4',
        value: 228264.46,
      },
      {
        text: 'Lote 4',
        value: 25206.61,
      },
      {
        text: 'Lote 4',
        value: 5123.97,
      },
      {
        text: 'Lote 4',
        value: 228264.46,
      },
      {
        text: 'Lote 4',
        value: 166942.15,
      },
      {
        text: 'Lote 4',
        value: 204545.45,
      },
      {
        text: 'Lote 4',
        value: 23719.01,
      },
      {
        text: 'Lote 4',
        value: 22727.27,
      },
      {
        text: 'Lote 4',
        value: 228264.46,
      },
      {
        text: 'Lote 4',
        value: 153719.01,
      },
      {
        text: 'Lote 4',
        value: 150991.74,
      },
      {
        text: 'Lote 4',
        value: 130991.74,
      },
      {
        text: 'Lote 4',
        value: 130991.74,
      },
      {
        text: 'Lote 4',
        value: 204545.45,
      },
      {
        text: 'Lote 4',
        value: 20000,
      },
      {
        text: 'Lote 4',
        value: 204545.45,
      },
      {
        text: 'Lote 4',
        value: 12396.69,
      },
      {
        text: 'Lote 4',
        value: 163388.43,
      },
      {
        text: 'Lote 4',
        value: 22727.27,
      },
      {
        text: 'Lote 5',
        value: 12231.4,
      },
      {
        text: 'Lote 5',
        value: 234462.81,
      },
      {
        text: 'Lote 5',
        value: 77685.95,
      },
      {
        text: 'Lote 5',
        value: 77685.95,
      },
      {
        text: 'Lote 5',
        value: 416115.7,
      },
      {
        text: 'Lote 5',
        value: 416115.7,
      },
      {
        text: 'Lote 5',
        value: 269008.26,
      },
      {
        text: 'Lote 5',
        value: 391487.6,
      },
      {
        text: 'Lote 5',
        value: 416115.7,
      },
      {
        text: 'Lote 5',
        value: 416115.7,
      },
      {
        text: 'Lote 5',
        value: 312148.76,
      },
      {
        text: 'Lote 5',
        value: 234462.81,
      },
      {
        text: 'Lote 5',
        value: 244214.88,
      },
      {
        text: 'Lote 5',
        value: 416115.7,
      },
      {
        text: 'Lote 5',
        value: 244214.88,
      },
      {
        text: 'Lote 5',
        value: 77685.95,
      },
      {
        text: 'Lote 5',
        value: 34380.17,
      },
    ];
    // Act
    let metadata = offersValuesMapper(parsedXml);
    // Assert
    expect(metadata).toStrictEqual(mockedOffers);
  });

  it('maps multiple offers values (nested sample 2)', async () => {
    // Arrange
    let fileContent: string = readFileSync(`${basePath}/202027647.xml`).toString('utf8');
    let parsedXml: ContractApiModel = await xmlService.parseXmlToJson(fileContent);
    let mockedOffers: OffersValues[] = [{ text: 'Lote 5', value: 0 }];
    // Act
    let metadata = offersValuesMapper(parsedXml);
    // Assert
    expect(metadata).toStrictEqual(mockedOffers);
  });

  it('maps multiple offers values (nested sample 3)', async () => {
    // Arrange
    let fileContent: string = readFileSync(`${basePath}/202012599.xml`).toString('utf8');
    let parsedXml: ContractApiModel = await xmlService.parseXmlToJson(fileContent);
    let mockedOffers: OffersValues[] = [
      { text: 'Lote 2', value: 397756.79 },
      {
        text: 'Lote 2',
        value: 738134.59,
      },
      {
        text: 'Lote 2',
        value: 161511.22,
      },
      {
        text: 'Lote 2',
        value: 369775.68,
      },
      {
        text: 'Lote 2',
        value: 104840.61,
      },
      {
        text: 'Lote 2',
        value: 27626.92,
      },
      {
        text: 'Lote 2',
        value: 140613.93,
      },
      {
        text: 'Lote 2',
        value: 27626.92,
      },
      {
        text: 'Lote 2',
        value: 161511.21,
      },
      {
        text: 'Lote 2',
        value: 130696.58,
      },
      {
        text: 'Lote 2',
        value: 612042.5,
      },
      {
        text: 'Lote 2',
        value: 108013.7,
      },
      {
        text: 'Lote 2',
        value: 43565.53,
      },
      {
        text: 'Lote 2',
        value: 27626.92,
      },
      {
        text: 'Lote 2',
        value: 471782.76,
      },
      {
        text: 'Lote 2',
        value: 218536.01,
      },
      {
        text: 'Lote 2',
        value: 43566.36,
      },
      {
        text: 'Lote 2',
        value: 1239669.42,
      },
      {
        text: 'Lote 2',
        value: 292207.79,
      },
      {
        text: 'Lote 2',
        value: 660920.89,
      },
      {
        text: 'Lote 2',
        value: 369067.29,
      },
      {
        text: 'Lote 2',
        value: 214285.72,
      },
      {
        text: 'Lote 2',
        value: 369775.68,
      },
      {
        text: 'Lote 2',
        value: 471782.76,
      },
      {
        text: 'Lote 2',
        value: 130696.58,
      },
      {
        text: 'Lote 2',
        value: 292207.79,
      },
      {
        text: 'Lote 2',
        value: 102007.08,
      },
      {
        text: 'Lote 2',
        value: 862455.73,
      },
      {
        text: 'Lote 2',
        value: 1188665.88,
      },
      {
        text: 'Lote 2',
        value: 104840.61,
      },
      {
        text: 'Lote 2',
        value: 369775.68,
      },
      {
        text: 'Lote 2',
        value: 404486.42,
      },
      {
        text: 'Lote 2',
        value: 71192.45,
      },
      {
        text: 'Lote 2',
        value: 43565.53,
      },
      {
        text: 'Lote 2',
        value: 43565.53,
      },
      {
        text: 'Lote 2',
        value: 376151.12,
      },
      {
        text: 'Lote 2',
        value: 369775.68,
      },
      {
        text: 'Lote 2',
        value: 104840.61,
      },
      {
        text: 'Lote 2',
        value: 471782.76,
      },
      {
        text: 'Lote 2',
        value: 1059031.88,
      },
      {
        text: 'Lote 2',
        value: 102007.08,
      },
      {
        text: 'Lote 2',
        value: 161511.21,
      },
      {
        text: 'Lote 2',
        value: 767886.66,
      },
      {
        text: 'Lote 2',
        value: 445218.42,
      },
      {
        text: 'Lote 2',
        value: 174262.11,
      },
      {
        text: 'Lote 2',
        value: 763990.55,
      },
      {
        text: 'Lote 2',
        value: 108013.7,
      },
      {
        text: 'Lote 2',
        value: 1239669.42,
      },
      {
        text: 'Lote 2',
        value: 471782.76,
      },
      {
        text: 'Lote 2',
        value: 43565.53,
      },
    ];
    // Act
    let metadata = offersValuesMapper(parsedXml);
    // Assert
    expect(metadata).toStrictEqual(mockedOffers);
  });
});
