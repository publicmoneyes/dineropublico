// ApiModels
// DT es un array de texto siempre | es el valor
// DL es un array que contiene un objeto {DD,DT} | es como el subnivel..
// DD es un array de texto o de un objeto {DL} | es el enunciado
export interface ContractContentApiModel {
  dl: DLContent[];
}

export interface DLContent {
  dd: DD;
  dt: DT;
}

export type DT = Array<string>;
export type DD = Array<ContractContentApiModel | string>;
export type DL = Array<DLContent>;

export interface MetadatosApiModel {
  departamento: any[];
  diario: any[];
  diario_numero: string[];
  fecha_publicacion: string[];
  seccion: string[];
  subseccion: string[];
  titulo: string[];
  url_pdf: string[];
  identificador: string[];
}

export interface ContractApiModel {
  documento: {
    texto: ContractContentApiModel[];
    metadatos: MetadatosApiModel[];
  };
}
