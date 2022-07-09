export type SuccessOrErrorKind = 'success' | 'error';

interface Response<T = void> {
  kind: SuccessOrErrorKind;
  response: T;
}

export interface SuccessResponse<T> extends Response<T> {
  kind: 'success';
}

export interface ErrorResponse<T> extends Response<T> {
  kind: 'error';
}

export const createSuccess = <T>(response?: T): SuccessResponse<T> => {
  return {
    kind: 'success',
    response,
  };
};

export const createError = <T>(response?: T): ErrorResponse<T> => {
  return {
    kind: 'error',
    response,
  };
};

export type SuccessOrError<T = void, E = void> = SuccessResponse<T> | ErrorResponse<E>;