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

  it('maps correctli multiple details', async () => {
    // Arrange
    let fileContent = readFileSync(`${basePath}/202027664.xml`).toString('utf8');
    let expectedDetails = [
      'Suministro Abierto de viveres para alimentacion de los residentes de la Residencia de Estudiantes de la Armada ``Teniente General Barroso´´.',
      'Lote 1: Lote 1 Carne fresca, salazón, aves y embutidos.',
      'Lote 2: Lote 2 Frutas, verduras y patatas.',
      'Lote 3: Lote 3 Pescados y mariscos frescos.',
      'Lote 4: Lote 4 Cerveza, vino y licores.',
      'Lote 5: Lote 5 Pan fresco .',
      'Lote 6: Lote 6 Derivados lácteos.',
    ];
    let parsedXml: ContractApiModel = await xmlService.parseXmlToJson(fileContent);

    // Act
    let details = detailsMapper(parsedXml);
    // Assert
    expect(details).toStrictEqual(expectedDetails);
  });

  it('maps correcte single details', async () => {
    // Arrange
    let fileContent = readFileSync(`${basePath}/202013138.xml`).toString('utf8');
    let expectedDetails = ['Suministro de 1.000.000 de hisopos para toma de muestras.'];
    let parsedXml: ContractApiModel = await xmlService.parseXmlToJson(fileContent);

    // Act
    let details = detailsMapper(parsedXml);
    // Assert
    expect(details).toStrictEqual(expectedDetails);
  });
});
