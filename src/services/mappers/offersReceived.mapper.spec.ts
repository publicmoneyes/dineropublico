import { Xml2JsonService } from '..';
import { readFileSync } from 'fs';
import { ContractApiModel } from '../api-models';
import { defaultOffersReceived, OffersReceived } from '../../models';
import { offersReceivedMapper } from './offersReceived.mapper';

describe('Offer received specs', () => {
  const basePath: string = './__mocks__/contracts-xml';
  const xmlService: Xml2JsonService = Xml2JsonService.getInstance();

  it('maps default offers received if the input its invalid', async () => {
    // Arrange
    let fileContent: string = readFileSync(`${basePath}/20209754.xml`).toString('utf8');
    let parsedXml: ContractApiModel = await xmlService.parseXmlToJson(fileContent);

    // Act
    parsedXml.documento.texto = []; // Make invalid
    let offersValue: OffersReceived[] = offersReceivedMapper(parsedXml);
    // Assert
    expect(offersValue).toStrictEqual([defaultOffersReceived()]);
  });

  it('maps a single offers received ', async () => {
    // Arrange
    let fileContent: string = readFileSync(`${basePath}/202013138.xml`).toString('utf8');
    let parsedXml: ContractApiModel = await xmlService.parseXmlToJson(fileContent);
    let mockedOffers: OffersReceived[] = [{ text: 'Número de ofertas recibidas', total: 1 }];
    // Act
    let metadata = offersReceivedMapper(parsedXml);
    // Assert
    expect(metadata).toStrictEqual(mockedOffers);
  });

  it('maps multiple offers received (nested sample 1)', async () => {
    // Arrange
    let fileContent: string = readFileSync(`${basePath}/20209754.xml`).toString('utf8');
    let parsedXml: ContractApiModel = await xmlService.parseXmlToJson(fileContent);
    let mockedOffers: OffersReceived[] = [
      { text: 'Lote 1', total: 38 },
      { text: 'Lote 2', total: 20 },
      { text: 'Lote 3', total: 40 },
      { text: 'Lote 4', total: 31 },
      { text: 'Lote 5', total: 24 },
    ];
    // Act
    let metadata = offersReceivedMapper(parsedXml);
    // Assert
    expect(metadata).toStrictEqual(mockedOffers);
  });

  it('maps multiple offers received (nested sample 2)', async () => {
    // Arrange
    let fileContent: string = readFileSync(`${basePath}/202027647.xml`).toString('utf8');
    let parsedXml: ContractApiModel = await xmlService.parseXmlToJson(fileContent);
    let mockedOffers: OffersReceived[] = [{ text: 'Lote 5', total: 3 }];
    // Act
    let metadata = offersReceivedMapper(parsedXml);
    // Assert
    expect(metadata).toStrictEqual(mockedOffers);
  });

  it('maps multiple offers received (nested sample 3)', async () => {
    // Arrange
    let fileContent: string = readFileSync(`${basePath}/202012599.xml`).toString('utf8');
    let parsedXml: ContractApiModel = await xmlService.parseXmlToJson(fileContent);
    let mockedOffers: OffersReceived[] = [{ text: 'Lote 2', total: 84 }];
    // Act
    let metadata = offersReceivedMapper(parsedXml);
    // Assert
    expect(metadata).toStrictEqual(mockedOffers);
  });
});
