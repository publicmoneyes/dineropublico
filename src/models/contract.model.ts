import { Metadata } from './metadata.model';
import { Details } from './details.model';
import { Description } from './description.model';
import { OffersReceived } from './offersReceived.model';
import { Awardees } from './awardees.model';
import { OffersValues } from './offerValues.model';

export interface Contract {
  metadata: Metadata;
  content: ContractContent;
}

export interface ContractContent {
  details: Details;
  description: Description;
  offersReceived: OffersReceived[];
  awardees: Awardees[];
  offerValues: OffersValues[];
  date: Date | undefined;
}
