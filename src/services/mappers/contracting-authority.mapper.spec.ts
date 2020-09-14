import { readFileSync } from 'fs';
import { Xml2JsonService } from '..';
import { ContractingAuthority } from '../../models';
import { ContractApiModel } from '../api-models';
import { contractingAuthorityMapper } from './contracting-authority.mapper';

describe('contracting authority specs', () => {
  const basePath: string = './__mocks__/contracts-xml';
  const xmlService: Xml2JsonService = Xml2JsonService.getInstance();

  it('maps a contract authority', async () => {
    // Arrange
    let fileContent = readFileSync(`${basePath}/202027664.xml`).toString('utf8');
    let parsedXml: ContractApiModel = await xmlService.parseXmlToJson(fileContent);

    let expectedContractingAuthority: ContractingAuthority = {
      activity: 'Defensa.',
      activityType: 'Administración General del Estado.',
      address: 'ARSENAL MILITAR CALLE IRMANDIÑOS S/N. Ferrol (A Coruña). A Coruña. 15490. España.',
      email: 'a3jucofer@fn.mde.es',
      name: 'Intendente de Ferrol.',
      nif: 'S1515003J.',
      telephone: '',
      web: '',
    };

    // Act
    const cAuths = contractingAuthorityMapper(parsedXml);
    // Assert
    expect(cAuths).toStrictEqual(expectedContractingAuthority);
  });

  it.only('maps a contract authority', async () => {
    // Arrange
    let fileContent = readFileSync(`${basePath}/202013157.xml`).toString('utf8');
    let parsedXml: ContractApiModel = await xmlService.parseXmlToJson(fileContent);

    let expectedContractingAuthority: ContractingAuthority = {
      activity: 'Pensiones.',
      activityType: 'Administración General del Estado.',
      address: 'Padre Damián, 4 y 6. Madrid. Madrid. 28036. España.',
      email: 'contratacion.administrativa1.inss@seg-social.es',
      name: 'INSS-Servicios Centrales-Subdirección General de Gestion Económico - Presupuestaria y Estudios Económicos.',
      nif: 'Q2827002C.',
      telephone: '',
      web: 'http://www.seg-social.es',
    };

    // Act
    const cAuths = contractingAuthorityMapper(parsedXml);
    // Assert
    expect(cAuths).toStrictEqual(expectedContractingAuthority);
  });
});
