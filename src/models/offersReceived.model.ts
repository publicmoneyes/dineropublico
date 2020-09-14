export interface OffersReceived {
  text: string;
  total: number;
}

export const defaultOffersReceived = (): OffersReceived => ({
  text: '',
  total: 0,
});
