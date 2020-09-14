import { readFileSync } from 'fs';
import { Xml2JsonService } from '..';
import { Contract, defaultContract } from '../../models';
import { ContractApiModel } from '../api-models';
import { contractMapper } from './contract.mapper';

describe('Contract specs', () => {
  const basePath: string = './__mocks__/contracts-xml';
  const xmlService: Xml2JsonService = Xml2JsonService.getInstance();

  it('maps invalid input', async () => {
    let fileContent = readFileSync(`${basePath}/202027664.xml`).toString('utf8');
    let parsedXml: ContractApiModel = await xmlService.parseXmlToJson(fileContent);
    parsedXml.documento = { metadatos: [], texto: [] };
    const mappedContract: Contract = contractMapper(parsedXml);
    expect(mappedContract).toStrictEqual(defaultContract());
  });

  it('maps valid input', async () => {
    let fileContent = readFileSync(`${basePath}/202013138.xml`).toString('utf8');
    let parsedXml: ContractApiModel = await xmlService.parseXmlToJson(fileContent);

    const expectedContract: Contract = {
      content: {
        awardees: [
          {
            address: 'Dirección desconocida. Dirección desconocida.   España.',
            name: 'MJ Steps.',
            nif: '',
            pyme: false,
          },
        ],
        contractAuthority: {
          activity: 'Sanidad.',
          activityType: 'Administración General del Estado.',
          address: 'c/ Alcalá, 56. Madrid. Madrid. 28014. España.',
          email: 'bazuara@ingesa.sanidad.gos.es',
          name: 'Dirección del Instituto Nacional de Gestión Sanitaria (INGESA).',
          nif: 'Q2869002B.',
          telephone: '',
          web: 'http://www.ingesa.mscbs.es',
        },
        date: new Date(Date.UTC(2020, 3, 27)),
        description: ['Suministro de 1.000.000 de hisopos para toma de muestras.'],
        details: ['33100000 (Equipamiento médico).'],
        offerValues: [
          {
            text: 'Valor de la oferta seleccionada',
            value: 4300000,
          },
        ],
        offersReceived: [
          {
            text: 'Número de ofertas recibidas',
            total: 1,
          },
        ],
      },
      metadata: {
        date: new Date(Date.UTC(2020, 3, 30)),
        department: 'Ministerio de Sanidad',
        diary: 120,
        identifier: 'BOE-B-2020-13138',
        pdfUrl: '/boe/dias/2020/04/30/pdfs/BOE-B-2020-13138.pdf',
        section: '5A',
        title:
          'Anuncio de formalización de contratos de: Dirección del Instituto Nacional de Gestión Sanitaria (INGESA). Objeto: Suministro de 1.000.000 de hisopos para toma de muestras. Expediente: Covid26.',
      },
    };
    const mappedContract: Contract = contractMapper(parsedXml);

    expect(mappedContract).toStrictEqual(expectedContract);
  });
});
