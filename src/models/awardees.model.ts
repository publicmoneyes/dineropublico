export interface Awardees {
  name: string;
  nif: string;
  address: string;
  pyme: boolean;
}

export const defaultAwardees = (): Awardees => ({
  address: '',
  nif: '',
  name: '',
  pyme: false,
});
