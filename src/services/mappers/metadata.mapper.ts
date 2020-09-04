import { ContractApiModel } from '../api-models';
import { Metadata, defaultMetadata } from '../../models';

export const metadataMapper = (contract: ContractApiModel): Metadata => {
  if (!contract || !contract.documento || !contract.documento.metadatos) {
    return defaultMetadata();
  }

  const metadata = contract.documento.metadatos.shift();

  if (metadata) {
    const department = metadata.departamento[0]._;
    const diary = +getValue(metadata.diario_numero);
    const identifier = getValue(metadata.identificador);
    const section = getValue(metadata.seccion);
    const subSeccion = getValue(metadata.subseccion);
    const title = getValue(metadata.titulo);
    const pdfUrl = getValue(metadata.url_pdf);
    const date = parseDate(metadata?.fecha_publicacion?.shift());

    return {
      department,
      diary,
      identifier,
      section: `${section}${subSeccion}`,
      title,
      pdfUrl,
      date,
    };
  }

  return defaultMetadata();
};

const parseDate = (yyyymmdd: string | undefined): Date | undefined => {
  if (!yyyymmdd) {
    return undefined;
  }

  const yyyy = +yyyymmdd.substring(0, 4);
  const mm = +yyyymmdd.substring(4, 6) - 1;
  const dd = +yyyymmdd.substr(6);

  return new Date(Date.UTC(yyyy, mm, dd));
};

const getValue = (arg: any[]): any => {
  let value = arg.shift();
  switch (typeof value) {
    case 'string':
      return value ? value : '';
    case 'number':
      return value ? value : -1;
    default:
      return '';
  }
};
