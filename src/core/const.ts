export const CONTRACTING_AUTHORITY = 'Poder adjudicador';
export const CONTRACT_TYPE = 'Tipo de poder adjudicador y principal actividad ejercida';
export const TYPE = 'Tipo';
export const ACTIVITY = 'Actividad principal ejercida';
export const NAME = 'Nombre';
export const NIF = 'Número de identificación fiscal';
export const ADDRESS = 'Dirección';
export const LOCATION = 'Localidad';
export const PROVINCE = 'Provincia';
export const POSCODE = 'Código postal';
export const COUNTRY = 'País';
export const TELEPHONE = 'Teléfono';
export const EMAIL = 'Correo electrónico';
export const WEB = 'Dirección principal';
export const OFFERS_RECEIVED = 'Ofertas recibidas';
export const NUM_OFFERS_RECEIVED = 'Número de ofertas recibidas';
export const AWARDEES = 'Adjudicatarios';
export const OFFERS_VALUE = 'Valor de las ofertas';
export const AD_DATE = 'Fecha de envío del anuncio';
export const DESCRIPTION = 'Descripción de la licitación';
export const CPV_CODE = 'Códigos CPV';
export const CONTRACT_FORMALIZATION = 'Anuncio de formalización de contratos';
export const PYME = 'El adjudicatario es una PYME';

// REGEXP
export const LIST_ENUM: RegExp = /([\d\.]+(?=\))|[:\)])/g;
export const DOT_CHARS_SPACES: RegExp = /[[\.a-z\s]+/g;

// First allowed date
export const FIRST_DATE: Date = new Date(Date.UTC(2019, 11, 31));
