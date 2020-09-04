import { Xml2JsonService } from '../xml2json.service';
import { readFileSync } from 'fs';
import { ContractApiModel } from '../api-models';
import { adDateMapper } from './ad-date.mapper';

describe('Ad date mapper specs', () => {
  const basePath: string = './__mocks__/contracts-xml';
  const xmlService: Xml2JsonService = Xml2JsonService.getInstance();

  it('returns undefined if the input its invalid', async () => {
    // Arrange
    let fileContent = readFileSync(`${basePath}/202027664.xml`).toString('utf8');
    let parsedXml: ContractApiModel = await xmlService.parseXmlToJson(fileContent);

    // Act
    parsedXml.documento.texto.shift(); // make the contract invalid
    const date = adDateMapper(parsedXml);

    // Assert
    expect(date).toBeUndefined();
  });

  it('maps a date', async () => {
    // Arrange
    let fileContent = readFileSync(`${basePath}/202027664.xml`).toString('utf8');
    let parsedXml: ContractApiModel = await xmlService.parseXmlToJson(fileContent);
    const givenDate: Date = new Date(Date.UTC(2020, 7, 26));

    // Act
    const date = adDateMapper(parsedXml);
    // Assert
    expect(date).toStrictEqual(givenDate);
  });
});
