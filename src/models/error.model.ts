export interface CustomError {
  message: string;
  statusCode: number;
  statusText?: string;
}

export const createError = (
  message: string,
  statusCode: number,
  statusText?: string
): CustomError => ({
  message,
  statusCode,
  statusText,
});
