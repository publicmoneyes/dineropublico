export interface Boe {
  idAnuncio: string[];
}

export const defaultBoe = (): Boe => ({
  idAnuncio: [],
});
