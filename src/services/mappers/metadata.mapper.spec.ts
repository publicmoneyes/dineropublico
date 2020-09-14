import { Xml2JsonService } from '../xml2json.service';
import { readFileSync } from 'fs';
import { ContractApiModel } from '../api-models';
import { defaultMetadata, Metadata } from '../../models';
import { metadataMapper } from './metadata.mapper';

describe('Metadata specs', () => {
  const basePath: string = './__mocks__/contracts-xml';
  const xmlService: Xml2JsonService = Xml2JsonService.getInstance();

  it('maps default metadata if the input its invalid', async () => {
    // Arrange
    let fileContent: string = readFileSync(`${basePath}/20209754.xml`).toString('utf8');
    let parsedXml: ContractApiModel = await xmlService.parseXmlToJson(fileContent);

    // Act
    parsedXml.documento.metadatos = []; // Make invalid metadata
    let metadata = metadataMapper(parsedXml);
    // Assert
    expect(metadata).toStrictEqual(defaultMetadata());
  });

  it('maps metadata', async () => {
    // Arrange
    let fileContent: string = readFileSync(`${basePath}/20209754.xml`).toString('utf8');
    let parsedXml: ContractApiModel = await xmlService.parseXmlToJson(fileContent);
    let mockedMetadata: Metadata = {
      date: new Date(Date.UTC(2020, 2, 3)),
      department: 'Ministerio de Defensa',
      diary: 54,
      identifier: 'BOE-B-2020-9754',
      pdfUrl: '/boe/dias/2020/03/03/pdfs/BOE-B-2020-9754.pdf',
      section: '5A',
      title:
        'Anuncio de formalización de contratos de: Jefatura de Intendencia de Asuntos Económicos Este. Objeto: Selección de empresas para el suministro de material de ferretería, eléctrico, construcción, fontanería y repuestos de automoción a las BAE,S ubicadas dentro del ámbito de la JIAE ESTE. Expediente: 2032719008000.',
    };
    // Act
    let metadata = metadataMapper(parsedXml);
    // Assert
    expect(metadata).toStrictEqual(mockedMetadata);
  });
});
