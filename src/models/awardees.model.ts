import { DLContent, DD, ContractContentApiModel } from '../services/api-models';
import { NAME, ADDRESS, NIF, LOCATION, PROVINCE, POSCODE, COUNTRY, PYME, LIST_ENUM, utils } from '../core';

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
  let nameIndex = constantValues
    .map((item) => utils.findItemIndex(item, normalizedContentList, keys.name))
    .filter(utils.isDistinctMinusOne);
  let nifIndex = constantValues.map((item) => utils.findItemIndex(item, normalizedContentList, keys.nif)).filter(utils.isDistinctMinusOne);
  let addressIndex = constantValues
    .map((item) => utils.findItemIndex(item, normalizedContentList, keys.address))
    .filter(utils.isDistinctMinusOne);
  let locationIndex = constantValues
    .map((item) => utils.findItemIndex(item, normalizedContentList, keys.location))
    .filter(utils.isDistinctMinusOne);
  let provinceIndex = constantValues
    .map((item) => utils.findItemIndex(item, normalizedContentList, keys.province))
    .filter(utils.isDistinctMinusOne);
  let poscodeIndex = constantValues
    .map((item) => utils.findItemIndex(item, normalizedContentList, keys.poscode))
    .filter(utils.isDistinctMinusOne);
  let countryIndex = constantValues
    .map((item) => utils.findItemIndex(item, normalizedContentList, keys.country))
    .filter(utils.isDistinctMinusOne);
  let pymeIndex = pymesIndex.map((item, index) => (item === keys.pyme ? index : -1)).filter(utils.isDistinctMinusOne);

  let address = utils.addressBuilder(content.dd, [
    utils.getItemIndex(addressIndex),
    utils.getItemIndex(locationIndex),
    utils.getItemIndex(provinceIndex),
    utils.getItemIndex(poscodeIndex),
    utils.getItemIndex(countryIndex),
  ]);

  return {
    address,
    name: utils.safeAccess(content.dd, utils.getItemIndex(nameIndex)),
    nif: utils.safeAccess(content.dd, utils.getItemIndex(nifIndex)),
    pyme: utils.getItemIndex(pymeIndex) !== -1,
  };
};

const isString = (str: string | ContractContentApiModel) => typeof str === 'string';
