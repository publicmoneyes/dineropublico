export interface OffersValues {
  value: number;
  text: string;
}

export const defaultOfferValue = (): OffersValues => ({
  text: '',
  value: 0,
});
