import { DLContent, DD, ContractContentApiModel } from '../services/api-models';
import { NAME, ADDRESS, NIF, LOCATION, PROVINCE, POSCODE, COUNTRY, PYME, LIST_ENUM } from '../core';

export interface Awardees {
  name: string;
  nif: string;
  address: string;
  pyme: boolean;
}

export const defaultAwardee = (): Awardees => ({
  address: '',
  nif: '',
  name: '',
  pyme: false,
});

export const awardeesFactory = (content: DLContent): Awardees | undefined => {
  if (!content) {
    return undefined;
  }

  const keys = {
    name: NAME,
    nif: NIF,
    address: ADDRESS,
    location: LOCATION,
    province: PROVINCE,
    poscode: POSCODE,
    country: COUNTRY,
    pyme: `${PYME}.`,
  };

  const normalizedContentList = content.dt.map((item) => item.replace(LIST_ENUM, '').trim());
  const constantValues = Object.values(keys);
  // For detecting pymes its diferent, because its comes in DD as a string.
  const pymesIndex = content.dd.filter(isString) as string[];

  // search for each constantValue in which position is its value inside the normalizedContent list
  let nameIndex = constantValues.map((item) => findItemIndex(item, normalizedContentList, keys.name)).filter(isDefined);
  let nifIndex = constantValues.map((item) => findItemIndex(item, normalizedContentList, keys.nif)).filter(isDefined);
  let addressIndex = constantValues.map((item) => findItemIndex(item, normalizedContentList, keys.address)).filter(isDefined);
  let locationIndex = constantValues.map((item) => findItemIndex(item, normalizedContentList, keys.location)).filter(isDefined);
  let provinceIndex = constantValues.map((item) => findItemIndex(item, normalizedContentList, keys.province)).filter(isDefined);
  let poscodeIndex = constantValues.map((item) => findItemIndex(item, normalizedContentList, keys.poscode)).filter(isDefined);
  let countryIndex = constantValues.map((item) => findItemIndex(item, normalizedContentList, keys.country)).filter(isDefined);
  let pymeIndex = pymesIndex.map((item, index) => (item === keys.pyme ? index : -1)).filter(isDefined);

  let address = addressBuilder(content.dd, [
    getItemIndex(addressIndex),
    getItemIndex(locationIndex),
    getItemIndex(provinceIndex),
    getItemIndex(poscodeIndex),
    getItemIndex(countryIndex),
  ]);

  return {
    address,
    name: safeAcces(content.dd, getItemIndex(nameIndex)),
    nif: safeAcces(content.dd, getItemIndex(nifIndex)),
    pyme: getItemIndex(pymeIndex) !== -1,
  };
};

const safeAcces = (collection: DD, index: number): string => {
  if (!collection || index < 0) {
    return '';
  }

  return (collection[index] as string) ?? '';
};

const isDefined = (k: any): boolean => k !== -1;

const findItemIndex = (item: string, normalizedContentCollection: string[], key: string): number => {
  let index = normalizedContentCollection.indexOf(item);
  if (index > -1 && item === key) {
    return index;
  }
  return -1;
};

const getItemIndex = (indexCollection: number[]) => (indexCollection.length ? indexCollection.shift()! : -1);

const addressBuilder = (content: DD, indexCollection: number[]) => {
  if (!indexCollection || !indexCollection.length) {
    return '';
  }

  let [addrIndex, locIndex, provIndex, pcIndex, countryIndex] = indexCollection;

  let street = safeAcces(content, addrIndex);
  let loc = safeAcces(content, locIndex);
  let prov = safeAcces(content, provIndex);
  let poscode = safeAcces(content, pcIndex);
  let country = safeAcces(content, countryIndex);

  return `${street} ${loc} ${prov} ${poscode} ${country}`.trim();
};

const isString = (str: string | ContractContentApiModel) => typeof str === 'string';
