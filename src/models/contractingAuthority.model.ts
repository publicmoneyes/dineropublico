import { ACTIVITY, TYPE, LIST_ENUM, utils, NAME, NIF, EMAIL, WEB, LOCATION, ADDRESS, COUNTRY, POSCODE, PROVINCE } from '../core';
import { DLContent } from '../services/api-models';

export interface ContractingAuthority {
  name: string;
  nif: string;
  address: string;
  telephone: string;
  email: string;
  web: string;
  activityType: string;
  activity: string;
}

export const defaultContractingAuthority = (): ContractingAuthority => ({
  name: '',
  nif: '',
  address: '',
  telephone: '',
  email: '',
  web: '',
  activityType: '',
  activity: '',
});

export const authorityTypeFactory = (content: DLContent): Partial<ContractingAuthority> => {
  if (!content) {
    return {};
  }

  const keys = {
    type: TYPE,
    activity: ACTIVITY,
  };

  const normalizedContentList = content.dt.map((item) => item.replace(LIST_ENUM, '').trim());
  const constantValues = Object.values(keys);

  let typeIndex = constantValues
    .map((item) => utils.findItemIndex(item, normalizedContentList, keys.type))
    .filter(utils.isDistinctMinusOne);
  let activityIndex = constantValues
    .map((item) => utils.findItemIndex(item, normalizedContentList, keys.activity))
    .filter(utils.isDistinctMinusOne);

  return {
    activity: utils.safeAccess(content.dd, utils.getItemIndex(activityIndex)),
    activityType: utils.safeAccess(content.dd, utils.getItemIndex(typeIndex)),
  };
};

export const contractingAuthorityFactory = (content: DLContent): Partial<ContractingAuthority> => {
  if (!content) {
    return {};
  }

  const keys = {
    name: NAME,
    nif: NIF,
    address: ADDRESS,
    location: LOCATION,
    province: PROVINCE,
    poscode: POSCODE,
    country: COUNTRY,
    email: EMAIL,
    web: WEB,
  };

  const normalizedContentList = content.dt.map((item) => item.replace(LIST_ENUM, '').trim());
  const constantValues = Object.values(keys);

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
  let emailIndex = constantValues
    .map((item) => utils.findItemIndex(item, normalizedContentList, keys.email))
    .filter(utils.isDistinctMinusOne);
  let webIndex = constantValues.map((item) => utils.findItemIndex(item, normalizedContentList, keys.web)).filter(utils.isDistinctMinusOne);

  let address = utils.addressBuilder(content.dd, [
    utils.getItemIndex(addressIndex),
    utils.getItemIndex(locationIndex),
    utils.getItemIndex(provinceIndex),
    utils.getItemIndex(poscodeIndex),
    utils.getItemIndex(countryIndex),
  ]);

  return {
    name: utils.safeAccess(content.dd, utils.getItemIndex(nameIndex)),
    nif: utils.safeAccess(content.dd, utils.getItemIndex(nifIndex)),
    address,
    email: utils.safeAccess(content.dd, utils.getItemIndex(emailIndex)),
    web: utils.safeAccess(content.dd, utils.getItemIndex(webIndex)),
  };
};
