import { awardeesMapper } from './awardees.mapper';
import { Xml2JsonService } from '..';
import { readFileSync } from 'fs';
import { ContractApiModel } from '../api-models';

describe('Awardees specs', () => {
  const basePath: string = './__mocks__/contracts-xml';
  const xmlService: Xml2JsonService = Xml2JsonService.getInstance();

  it('returns an empty list if the given input its invalid', () => {
    const awardees = awardeesMapper(undefined as any);
    expect(awardees).toHaveLength(0);
  });

  it('maps an awardee', async () => {
    // Arrange
    let fileContent = readFileSync(`${basePath}/202027664.xml`).toString('utf8');
    let parsedXml: ContractApiModel = await xmlService.parseXmlToJson(fileContent);
    let expectedAwardee = [{ address: 'España.', name: 'MERCASH SAR, S.L.U.', nif: 'B36007409.', pyme: false }];

    // Act
    const awardees = awardeesMapper(parsedXml);
    // Assert
    expect(awardees).toStrictEqual(expectedAwardee);
    expect(awardees).toHaveLength(1);
  });

  it('maps multiples awardees', async () => {
    // Arrange
    let fileContent = readFileSync(`${basePath}/20209754.xml`).toString('utf8');
    let parsedXml: ContractApiModel = await xmlService.parseXmlToJson(fileContent);
    let expectedAwardee = [
      { address: 'a. a.  28190. España.', name: 'ALDA CONSULTORIA Y PROYECTOS, S.L.', nif: 'B87483996.', pyme: true },
      {
        address: 'a. a.  50300. España.',
        name: 'ARTURO GINES,S.C.',
        nif: 'J50482660.',
        pyme: true,
      },
      {
        address: 'a. a.  50013. España.',
        name: 'AUTO RECAMBIOS ARAGONESA S.L.',
        nif: 'B50590801.',
        pyme: true,
      },
      {
        address: 'a. a.  28925. España.',
        name: 'Almacenes Industriales Distem .',
        nif: 'B82131582.',
        pyme: true,
      },
      {
        address: 'a. a.  50420. España.',
        name: 'BRICOVIAN SL.',
        nif: 'B99320822.',
        pyme: true,
      },
      {
        address: 'a. a.  25597. España.',
        name: 'CERVOS MATRIALS DE CONSTRUCCIÓ SL.',
        nif: 'B25564360.',
        pyme: true,
      },
      {
        address: 'a. a.  50007. España.',
        name: 'COMERCIAL FERRETERA VIÑAS SL.',
        nif: 'B50139526.',
        pyme: true,
      },
      {
        address: 'a. a.  28935. España.',
        name: 'COMERCIAL HERNANDO MORENO-COHEMO, S.L.U.',
        nif: 'B80575731.',
        pyme: true,
      },
      {
        address: 'a. a.  50171. España.',
        name: 'DISTRIBUCIONES NAVARRO MIR S.L.',
        nif: 'B50731090.',
        pyme: true,
      },
      {
        address: 'a. a.  41008. España.',
        name: 'DOMASA AGRICOLA, S.L.',
        nif: 'B41940040.',
        pyme: true,
      },
      {
        address: 'a. a.  26004. España.',
        name: 'Exclusivas Zabaleta, S.A.U.',
        nif: 'A26038265.',
        pyme: true,
      },
      {
        address: 'a. a.  28050. España.',
        name: 'FCC INDUSTRIAL.',
        nif: 'A28482024.',
        pyme: false,
      },
      {
        address: 'a. a.  50010. España.',
        name: 'FERRETERIA ARIES S.A.',
        nif: 'A50047646.',
        pyme: true,
      },
      {
        address: 'a. a.  28770. España.',
        name: 'FERRETERIA FERAYU S.L.',
        nif: 'B83234799.',
        pyme: true,
      },
      {
        address: 'a. a.  03006. España.',
        name: 'FERRETERIA FLORIDA, S.L.',
        nif: 'B03084829.',
        pyme: true,
      },
      {
        address: 'a. a.  07013. España.',
        name: 'FERRETERIA SON GARRIT S.L.',
        nif: 'b07298425.',
        pyme: true,
      },
      {
        address: 'a. a.  22006. España.',
        name: 'FERRETERIA Y SUMINISTROS INDUSTRIALES SENAVI, S.L.',
        nif: 'B22277842.',
        pyme: true,
      },
      {
        address: 'a. a.  46988. España.',
        name: 'FERRO SUMINISTROS INDUSTRIALES S.L.',
        nif: 'B96365374.',
        pyme: true,
      },
      {
        address: 'a. a.  50005. España.',
        name: 'GIMENO SUMINISTROS INDUSTRIALES, S.A.',
        nif: 'A50079771.',
        pyme: true,
      },
      {
        address: 'a. a.  28021. España.',
        name: 'Grupo de ingeniería, reconstrucción y recambios JPG S.A.',
        nif: 'A80875495.',
        pyme: true,
      },
      {
        address: 'a. a.  50015. España.',
        name: 'Hierros Alfonso SL.',
        nif: 'B50014521.',
        pyme: true,
      },
      {
        address: 'a. a.  28020. España.',
        name: 'IBERDEFENSA MANTENIMIENTO TECNICO SL.',
        nif: 'B85365195.',
        pyme: true,
      },
      {
        address: 'a. a.  28918. España.',
        name: 'IMPORTACIONES INDUSTRIALES, S.A.',
        nif: 'A28013548.',
        pyme: true,
      },
      {
        address: 'a. a.  28670. España.',
        name: 'INTEGRACION TECNOLOGICA EMPRESARIAL, S.L.',
        nif: 'B83385575.',
        pyme: true,
      },
      {
        address: 'a. a.  50013. España.',
        name: 'OVIDIO RIN S.A.',
        nif: 'A50008838.',
        pyme: true,
      },
      {
        address: 'a. a.  50014. España.',
        name: 'PINCOLOR, S. L.',
        nif: 'B50029545.',
        pyme: true,
      },
      {
        address: 'a. a.  22700. España.',
        name: 'SANARA HOGAR S.A.',
        nif: 'A22109151.',
        pyme: true,
      },
      {
        address: 'a. a.  28938. España.',
        name: 'STAR DEFENCE LOGISTICS AND ENGINEERING S.L.',
        nif: 'B85489276.',
        pyme: true,
      },
      {
        address: 'a. a.  30353. España.',
        name: 'SUMINISTROS DE CARTAGENA S.L.',
        nif: 'B30606172.',
        pyme: true,
      },
      {
        address: 'a. a.  44600. España.',
        name: 'SUMINISTROS INDUSTRIALES HIERROS ALCAÑIZ SL.',
        nif: 'B44252823.',
        pyme: true,
      },
      {
        address: 'a. a.  50820. España.',
        name: 'SUMINISTROS MERA S.L.',
        nif: 'B50098771.',
        pyme: true,
      },
      {
        address: 'a. a.  22006. España.',
        name: 'SUMINISTROS MONCAYO, S.A.',
        nif: 'A22014435.',
        pyme: true,
      },
      {
        address: 'a. a.  26006. España.',
        name: 'SUOJA, S.L.',
        nif: 'B26218578.',
        pyme: true,
      },
      {
        address: 'a. a.  08031. España.',
        name: 'TEARCO TECNICOS SL.',
        nif: 'B62711239.',
        pyme: true,
      },
      {
        address: 'a. a.  22500. España.',
        name: 'TECNIRIEGO BINEFAR S.L.',
        nif: 'B22394274.',
        pyme: true,
      },
      {
        address: 'A. A.  46460. España.',
        name: 'Valencia Sur S.L.',
        nif: 'b46255246.',
        pyme: true,
      },
      {
        address: 'a. a.  08184. España.',
        name: 'Würth España, S.A.',
        nif: 'A08472276.',
        pyme: false,
      },
      {
        address: 'a. a.  50830. España.',
        name: 'blarozar sl.',
        nif: 'b50354596.',
        pyme: true,
      },
      {
        address: 'a. a.  25597. España.',
        name: 'CERVOS MATRIALS DE CONSTRUCCIÓ SL.',
        nif: 'B25564360.',
        pyme: true,
      },
      {
        address: 'a. a.  28935. España.',
        name: 'COMERCIAL HERNANDO MORENO-COHEMO, S.L.U.',
        nif: 'B80575731.',
        pyme: true,
      },
      {
        address: 'a. a.  46980. España.',
        name: 'DASITEL SL.',
        nif: 'B96994967.',
        pyme: true,
      },
      {
        address: 'a. a.  26004. España.',
        name: 'Esclapés e Hijos S.L.',
        nif: 'B03891983.',
        pyme: true,
      },
      {
        address: 'a. a.  28050. España.',
        name: 'FCC INDUSTRIAL.',
        nif: 'A28482024.',
        pyme: false,
      },
      {
        address: 'a. a.  28770. España.',
        name: 'FERRETERIA FERAYU S.L.',
        nif: 'B83234799.',
        pyme: true,
      },
      {
        address: 'a. a.  46988. España.',
        name: 'FERRO SUMINISTROS INDUSTRIALES S.L.',
        nif: 'B96365374.',
        pyme: true,
      },
      {
        address: 'a. a.  22260. España.',
        name: 'HORMIGONES GRAÑEN, S.L.',
        nif: 'B22009377.',
        pyme: true,
      },
      {
        address: 'a. a.  50015. España.',
        name: 'Hierros Alfonso SL.',
        nif: 'B50014521.',
        pyme: true,
      },
      {
        address: 'a. a.  50014. España.',
        name: 'PINCOLOR, S. L.',
        nif: 'B50029545.',
        pyme: true,
      },
      {
        address: 'a. a.  22700. España.',
        name: 'SANARA HOGAR S.A.',
        nif: 'A22109151.',
        pyme: true,
      },
      {
        address: 'a. a.  22006. España.',
        name: 'SUMINISTROS MONCAYO, S.A.',
        nif: 'A22014435.',
        pyme: true,
      },
      {
        address: 'a. a.  08031. España.',
        name: 'TEARCO TECNICOS SL.',
        nif: 'B62711239.',
        pyme: true,
      },
      {
        address: 'a. a.  28190. España.',
        name: 'ALDA CONSULTORIA Y PROYECTOS, S.L.',
        nif: 'B87483996.',
        pyme: true,
      },
      {
        address: 'a. a.  50018. España.',
        name: 'ANEUM LED SL.',
        nif: 'B99273369.',
        pyme: true,
      },
      {
        address: 'a. a.  50005. España.',
        name: 'ARAELECTRIC S.A.',
        nif: 'A50046408.',
        pyme: true,
      },
      {
        address: 'a. a.  50420. España.',
        name: 'BRICOVIAN SL.',
        nif: 'B99320822.',
        pyme: true,
      },
      {
        address: 'a. a.  25597. España.',
        name: 'CERVOS MATRIALS DE CONSTRUCCIÓ SL.',
        nif: 'B25564360.',
        pyme: true,
      },
      {
        address: 'a. a.  50007. España.',
        name: 'COMERCIAL FERRETERA VIÑAS SL.',
        nif: 'B50139526.',
        pyme: true,
      },
      {
        address: 'a. a.  28935. España.',
        name: 'COMERCIAL HERNANDO MORENO-COHEMO, S.L.U.',
        nif: 'B80575731.',
        pyme: true,
      },
      {
        address: 'a. a.  33211. España.',
        name: 'COMERCIAL HISPANOFIL, S.A.U.',
        nif: 'A48116404.',
        pyme: false,
      },
      {
        address: 'a. a.  46980. España.',
        name: 'DASITEL SL.',
        nif: 'B96994967.',
        pyme: true,
      },
      {
        address: 'a. a.  41008. España.',
        name: 'DOMASA AGRICOLA, S.L.',
        nif: 'B41940040.',
        pyme: true,
      },
      {
        address: 'a. a.  50013. España.',
        name: 'ELECTRICIDAD Y LUZ DE ARAGON SL.',
        nif: 'B50010438.',
        pyme: true,
      },
      {
        address: 'a. a.  26004. España.',
        name: 'Esclapés e Hijos S.L.',
        nif: 'B03891983.',
        pyme: false,
      },
      {
        address: 'a. a.  28050. España.',
        name: 'FCC INDUSTRIAL.',
        nif: 'A28482024.',
        pyme: false,
      },
      {
        address: 'a. a.  50010. España.',
        name: 'FERRETERIA ARIES S.A.',
        nif: 'A50047646.',
        pyme: true,
      },
      {
        address: 'a. a.  28770. España.',
        name: 'FERRETERIA FERAYU S.L.',
        nif: 'B83234799.',
        pyme: true,
      },
      {
        address: 'a. a.  07013. España.',
        name: 'FERRETERIA SON GARRIT S.L.',
        nif: 'b07298425.',
        pyme: true,
      },
      {
        address: 'a. a.  46988. España.',
        name: 'FERRO SUMINISTROS INDUSTRIALES S.L.',
        nif: 'B96365374.',
        pyme: true,
      },
      {
        address: 'a. a.  08020. España.',
        name: 'GUERIN SA.',
        nif: 'A08178097.',
        pyme: false,
      },
      {
        address: 'a. a.  28021. España.',
        name: 'Grupo de ingeniería, reconstrucción y recambios JPG S.A.',
        nif: 'A80875495.',
        pyme: true,
      },
      {
        address: 'a. a.  46017. España.',
        name: 'MIRIAM GOMEZ GAJATE DECO-LED VLC.',
        nif: '24345907Q.',
        pyme: true,
      },
      {
        address: 'a. a.  50041. España.',
        name: 'NOVELEC EBRO S.L.',
        nif: 'B99423824.',
        pyme: true,
      },
      {
        address: 'a. a.  50013. España.',
        name: 'OVIDIO RIN S.A.',
        nif: 'A50008838.',
        pyme: true,
      },
      {
        address: 'a. a.  50014. España.',
        name: 'PINCOLOR, S. L.',
        nif: 'B50029545.',
        pyme: true,
      },
      {
        address: 'a. a.  50014. España.',
        name: 'SALTOKI SUMIN. ZARAGOZA, S.L.',
        nif: 'B99385502.',
        pyme: true,
      },
      {
        address: 'a. a.  22700. España.',
        name: 'SANARA HOGAR S.A.',
        nif: 'A22109151.',
        pyme: true,
      },
      {
        address: 'a. a.  50300. España.',
        name: 'SIERRA Y ROYO S.L.',
        nif: 'B50124353.',
        pyme: true,
      },
      {
        address: 'a. a.  28938. España.',
        name: 'STAR DEFENCE LOGISTICS AND ENGINEERING S.L.',
        nif: 'B85489276.',
        pyme: true,
      },
      {
        address: 'a. a.  30353. España.',
        name: 'SUMINISTROS DE CARTAGENA S.L.',
        nif: 'B30606172.',
        pyme: true,
      },
      {
        address: 'a. a.  08031. España.',
        name: 'TEARCO TECNICOS SL.',
        nif: 'B62711239.',
        pyme: true,
      },
      {
        address: 'a. a.  30353. España.',
        name: 'TEDITRONIC, SL.',
        nif: 'B30665400.',
        pyme: true,
      },
      {
        address: 'a. a.  46980. España.',
        name: 'TELEMIRA.',
        nif: 'B96563952.',
        pyme: true,
      },
      {
        address: 'a. a.  50420. España.',
        name: 'BRICOVIAN SL.',
        nif: 'B99320822.',
        pyme: true,
      },
      {
        address: 'a. a.  25597. España.',
        name: 'CERVOS MATRIALS DE CONSTRUCCIÓ SL.',
        nif: 'B25564360.',
        pyme: true,
      },
      {
        address: 'a. a.  50007. España.',
        name: 'COMERCIAL FERRETERA VIÑAS SL.',
        nif: 'B50139526.',
        pyme: true,
      },
      {
        address: 'a. a.  28935. España.',
        name: 'COMERCIAL HERNANDO MORENO-COHEMO, S.L.U.',
        nif: 'B80575731.',
        pyme: true,
      },
      {
        address: 'a. a.  46980. España.',
        name: 'DASITEL SL.',
        nif: 'B96994967.',
        pyme: true,
      },
      {
        address: 'a. a.  26004. España.',
        name: 'Exclusivas Zabaleta, S.A.U.',
        nif: 'A26038265.',
        pyme: true,
      },
      {
        address: 'a. a.  28050. España.',
        name: 'FCC INDUSTRIAL.',
        nif: 'A28482024.',
        pyme: false,
      },
      {
        address: 'a. a.  50010. España.',
        name: 'FERRETERIA ARIES S.A.',
        nif: 'A50047646.',
        pyme: true,
      },
      {
        address: 'a. a.  28770. España.',
        name: 'FERRETERIA FERAYU S.L.',
        nif: 'B83234799.',
        pyme: true,
      },
      {
        address: 'a. a.  07013. España.',
        name: 'FERRETERIA SON GARRIT S.L.',
        nif: 'b07298425.',
        pyme: true,
      },
      {
        address: 'a. a.  46988. España.',
        name: 'FERRO SUMINISTROS INDUSTRIALES S.L.',
        nif: 'B96365374.',
        pyme: true,
      },
      {
        address: 'a. a.  28019. España.',
        name: 'INSTALACIONES Y MANTENIMIENTOS MAGAR, SL.',
        nif: 'B80299191.',
        pyme: true,
      },
      {
        address: 'a. a.  28670. España.',
        name: 'INTEGRACION TECNOLOGICA EMPRESARIAL, S.L.',
        nif: 'B83385575.',
        pyme: true,
      },
      {
        address: 'a. a.  50041. España.',
        name: 'NOVELEC EBRO S.L.',
        nif: 'B99423824.',
        pyme: true,
      },
      {
        address: 'a. a.  50013. España.',
        name: 'OVIDIO RIN S.A.',
        nif: 'A50008838.',
        pyme: true,
      },
      {
        address: 'a. a.  50014. España.',
        name: 'PINCOLOR, S. L.',
        nif: 'B50029545.',
        pyme: true,
      },
      {
        address: 'a. a.  50014. España.',
        name: 'SALTOKI SUMIN. ZARAGOZA, S.L.',
        nif: 'B99385502.',
        pyme: true,
      },
      {
        address: 'a. a.  22700. España.',
        name: 'SANARA HOGAR S.A.',
        nif: 'A22109151.',
        pyme: true,
      },
      {
        address: 'a. a.  30353. España.',
        name: 'SUMINISTROS DE CARTAGENA S.L.',
        nif: 'B30606172.',
        pyme: true,
      },
      {
        address: 'a. a.  08031. España.',
        name: 'TEARCO TECNICOS SL.',
        nif: 'B62711239.',
        pyme: true,
      },
      {
        address: 'a. a.  22500. España.',
        name: 'TECNIRIEGO BINEFAR S.L.',
        nif: 'B22394274.',
        pyme: true,
      },
      {
        address: 'a. a.  46988. España.',
        name: 'TUBERAGUA SUMINISTROS, S.L.',
        nif: 'B98011562.',
        pyme: true,
      },
      {
        address: 'a. a.  28190. España.',
        name: 'ALDA CONSULTORIA Y PROYECTOS, S.L.',
        nif: 'B87483996.',
        pyme: true,
      },
      {
        address: 'a. a.  50013. España.',
        name: 'AUTO RECAMBIOS ARAGONESA S.L.',
        nif: 'B50590801.',
        pyme: true,
      },
      {
        address: 'a. a.  46018. España.',
        name: 'AUTO RECAMBIOS STOP, SL.',
        nif: 'B46111852.',
        pyme: true,
      },
      {
        address: 'a. a.  46920. España.',
        name: 'AUTORECAMBIOS VIMAR S.L.',
        nif: 'B46700571.',
        pyme: true,
      },
      {
        address: 'a. a.  28935. España.',
        name: 'COMERCIAL HERNANDO MORENO-COHEMO, S.L.U.',
        nif: 'B80575731.',
        pyme: true,
      },
      {
        address: 'a. a.  41008. España.',
        name: 'DOMASA AGRICOLA, S.L.',
        nif: 'B41940040.',
        pyme: true,
      },
      {
        address: 'a. a.  50010. España.',
        name: 'FERRETERIA ARIES S.A.',
        nif: 'A50047646.',
        pyme: true,
      },
      {
        address: 'a. a.  28770. España.',
        name: 'FERRETERIA FERAYU S.L.',
        nif: 'B83234799.',
        pyme: true,
      },
      {
        address: 'a. a.  28021. España.',
        name: 'Grupo de ingeniería, reconstrucción y recambios JPG S.A.',
        nif: 'A80875495.',
        pyme: true,
      },
      {
        address: 'a. a.  28020. España.',
        name: 'IBERDEFENSA MANTENIMIENTO TECNICO SL.',
        nif: 'B85365195.',
        pyme: true,
      },
      {
        address: 'a. a.  28670. España.',
        name: 'INTEGRACION TECNOLOGICA EMPRESARIAL, S.L.',
        nif: 'B83385575.',
        pyme: true,
      },
      {
        address: 'a. a.  50013. España.',
        name: 'OVIDIO RIN S.A.',
        nif: 'A50008838.',
        pyme: true,
      },
      {
        address: 'a. a.  50010. España.',
        name: 'SARASATE SUMINISTROS S.L.',
        nif: 'B99336463.',
        pyme: true,
      },
      {
        address: 'a. a.  28938. España.',
        name: 'STAR DEFENCE LOGISTICS AND ENGINEERING S.L.',
        nif: 'B85489276.',
        pyme: true,
      },
      {
        address: 'a. a.  50820. España.',
        name: 'SUMINISTROS MERA S.L.',
        nif: 'B50098771.',
        pyme: true,
      },
      {
        address: 'a. a.  46100. España.',
        name: 'TALLER AGUSTIN GALLEGO, S.L.U.',
        nif: 'B98522337.',
        pyme: true,
      },
      {
        address: 'a. a.  03690. España.',
        name: 'TALLERES RUVAMAR. S.L.',
        nif: '',
        pyme: true,
      },
    ];

    // Act
    const awardees = awardeesMapper(parsedXml);
    // Assert
    expect(awardees).toStrictEqual(expectedAwardee);
    expect(awardees).toHaveLength(121);
  });
});
