import { readFileSync } from 'fs';
import { Xml2JsonService } from '..';
import { defaultContractContent } from '../../models';
import { ContractApiModel } from '../api-models';
import { contractContentMapper } from './contractContent.mapper';

describe('Contract content specs', () => {
  const basePath: string = './__mocks__/contracts-xml';
  const xmlService: Xml2JsonService = Xml2JsonService.getInstance();

  it('maps invalid input', async () => {
    let fileContent = readFileSync(`${basePath}/202027664.xml`).toString('utf8');
    let parsedXml: ContractApiModel = await xmlService.parseXmlToJson(fileContent);
    parsedXml.documento.texto.shift();
    const mappedContractContent = contractContentMapper(parsedXml);
    expect(mappedContractContent).toStrictEqual(defaultContractContent());
  });

  it('maps valid input', async () => {
    let fileContent = readFileSync(`${basePath}/202027664.xml`).toString('utf8');
    let parsedXml: ContractApiModel = await xmlService.parseXmlToJson(fileContent);
    const expectedContractContent = {
      awardees: [
        {
          address: 'España.',
          name: 'MERCASH SAR, S.L.U.',
          nif: 'B36007409.',
          pyme: false,
        },
      ],
      contractAuthority: {
        activity: 'Defensa.',
        activityType: 'Administración General del Estado.',
        address: 'ARSENAL MILITAR CALLE IRMANDIÑOS S/N. Ferrol (A Coruña). A Coruña. 15490. España.',
        email: 'a3jucofer@fn.mde.es',
        name: 'Intendente de Ferrol.',
        nif: 'S1515003J.',
        telephone: '',
        web: '',
      },
      date: new Date(Date.UTC(2020, 7, 26)),
      description: [
        'Suministro Abierto de viveres para alimentacion de los residentes de la Residencia de Estudiantes de la Armada ``Teniente General Barroso´´.',
        'Lote 1: Lote 1 Carne fresca, salazón, aves y embutidos.',
        'Lote 2: Lote 2 Frutas, verduras y patatas.',
        'Lote 3: Lote 3 Pescados y mariscos frescos.',
        'Lote 4: Lote 4 Cerveza, vino y licores.',
        'Lote 5: Lote 5 Pan fresco .',
        'Lote 6: Lote 6 Derivados lácteos.',
      ],
      details: [
        '15800000 (Productos alimenticios diversos).',
        'Lote 1: 15800000 (Productos alimenticios diversos).',
        'Lote 2: 15800000 (Productos alimenticios diversos).',
        'Lote 3: 15800000 (Productos alimenticios diversos).',
        'Lote 4: 15800000 (Productos alimenticios diversos).',
        'Lote 5: 15800000 (Productos alimenticios diversos).',
        'Lote 6: 15800000 (Productos alimenticios diversos).',
      ],
      offerValues: [
        {
          text: 'Lote 1',
          value: 36362.73,
        },
        {
          text: 'Lote 1',
          value: 34908.22,
        },
        {
          text: 'Lote 1',
          value: 34908.22,
        },
      ],
      offersReceived: [
        {
          text: 'Lote 1',
          total: 1,
        },
      ],
    };
    const mappedContractContent = contractContentMapper(parsedXml);
    expect(mappedContractContent).toStrictEqual(expectedContractContent);
  });

  it('maps valid input', async () => {
    let fileContent = readFileSync(`${basePath}/202013138.xml`).toString('utf8');
    let parsedXml: ContractApiModel = await xmlService.parseXmlToJson(fileContent);
    const expectedContractContent = {
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
    };
    const mappedContractContent = contractContentMapper(parsedXml);
    expect(mappedContractContent).toStrictEqual(expectedContractContent);
  });
});
