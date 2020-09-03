export interface Boe {
  contractIdCollection: string[];
}

export const defaultBoe = (): Boe => ({
  contractIdCollection: [],
});
