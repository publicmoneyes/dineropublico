export interface Metadata {
  identifier: string;
  department: string;
  diary: number;
  date: Date | undefined;
  title: string;
  section: string;
  pdfUrl: string;
}

export const defaultMetadata = (): Metadata => ({
  identifier: '',
  department: '',
  diary: -1,
  date: undefined,
  title: '',
  section: '',
  pdfUrl: '',
});
