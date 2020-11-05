import { defaultMetadata, Metadata } from './metadata.model';
import { defaultDetails, Details } from './details.model';
import { defaultDescription, Description } from './description.model';
import { OffersReceived } from './offersReceived.model';
import { Awardees } from './awardees.model';
import { OffersValues } from './offerValues.model';
import { ContractingAuthority, defaultContractingAuthority } from './contractingAuthority.model';

export interface Contract {
  id: string;
  metadata: Metadata;
  content: ContractContent;
}

export interface ContractContent {
  contractAuthority: ContractingAuthority;
  details: Details;
  description: Description;
  offersReceived: OffersReceived[];
  awardees: Awardees[];
  offerValues: OffersValues[];
  date: Date | undefined;
}

export const defaultContractContent = (): ContractContent => ({
  contractAuthority: defaultContractingAuthority(),
  details: defaultDetails(),
  description: defaultDescription(),
  offersReceived: [],
  awardees: [],
  offerValues: [],
  date: undefined,
});

export const defaultContract = (): Contract => ({
  id: '',
  metadata: defaultMetadata(),
  content: defaultContractContent(),
});
