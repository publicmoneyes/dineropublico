export interface OffersReceived {
  text: string;
  total: number;
}

export const defaultOffers = (): OffersReceived => ({
  text: '',
  total: 0,
});
