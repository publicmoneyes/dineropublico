import { utils } from '../../core';
import { ContractContent, defaultContractContent } from '../../models';
import { ContractApiModel } from '../api-models';
import { adDateMapper } from './ad-date.mapper';
import { awardeesMapper } from './awardees.mapper';
import { contractingAuthorityMapper } from './contracting-authority.mapper';
import { descriptionMapper } from './description.mapper';
import { detailsMapper } from './details.mapper';
import { offersReceivedMapper } from './offersReceived.mapper';
import { offersValuesMapper } from './offersValues.mapper';

export const contractContentMapper = (contract: ContractApiModel): ContractContent => {
  const contractContent = defaultContractContent();
  if (!contract || !contract.documento || !contract.documento.texto) {
    return contractContent;
  }

  const {
    documento: { texto },
  } = contract;

  const content = JSON.stringify(utils.copyObject(texto[0]?.dl));

  if (content) {
    contractContent.awardees = awardeesMapper(contract);
    contractContent.contractAuthority = contractingAuthorityMapper(contract);
    contractContent.offerValues = offersValuesMapper(contract);
    contractContent.offersReceived = offersReceivedMapper(contract);
    contractContent.date = adDateMapper(contract);
    contractContent.description = descriptionMapper(contract);
    contractContent.details = detailsMapper(contract);
  }

  return contractContent;
};
