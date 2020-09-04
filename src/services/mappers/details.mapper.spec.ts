import { defaultDetails } from '../../models';
import { detailsMapper } from './details.mapper';
import { readFileSync } from 'fs';
import { Xml2JsonService } from '../xml2json.service';
import { ContractApiModel } from '../api-models';

describe('Details mapper specs', () => {
  const basePath: string = './__mocks__/contracts-xml';
  const xmlService: Xml2JsonService = Xml2JsonService.getInstance();

  it('maps to default details if the input its invalid', async () => {
    // Arrange
    let fileContent = readFileSync(`${basePath}/202027664.xml`).toString('utf8');
    let parsedXml: ContractApiModel = await xmlService.parseXmlToJson(fileContent);
    // Act
    parsedXml.documento.texto.shift(); // make the contract invalid
    let details = detailsMapper(parsedXml);
    // Assert
    expect(details).toStrictEqual(defaultDetails());
  });

  it('maps correctly multiple details', async () => {
    // Arrange
    let fileContent = readFileSync(`${basePath}/202027664.xml`).toString('utf8');
    let expectedDetails = [
      '15800000 (Productos alimenticios diversos).',
      'Lote 1: 15800000 (Productos alimenticios diversos).',
      'Lote 2: 15800000 (Productos alimenticios diversos).',
      'Lote 3: 15800000 (Productos alimenticios diversos).',
      'Lote 4: 15800000 (Productos alimenticios diversos).',
      'Lote 5: 15800000 (Productos alimenticios diversos).',
      'Lote 6: 15800000 (Productos alimenticios diversos).',
    ];
    let parsedXml: ContractApiModel = await xmlService.parseXmlToJson(fileContent);

    // Act
    let details = detailsMapper(parsedXml);
    // Assert
    expect(details).toStrictEqual(expectedDetails);
  });

  it('maps correctly single details', async () => {
    // Arrange
    let fileContent = readFileSync(`${basePath}/202013138.xml`).toString('utf8');
    let expectedDetails = ['33100000 (Equipamiento médico).'];
    let parsedXml: ContractApiModel = await xmlService.parseXmlToJson(fileContent);

    // Act
    let details = detailsMapper(parsedXml);
    // Assert
    expect(details).toStrictEqual(expectedDetails);
  });
});
