export enum ErrorCode {
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  BAD_REQUEST = 'BAD_REQUEST',

  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  TOKEN_INVALID = 'TOKEN_INVALID',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  EMAIL_ALREADY_EXISTS = 'EMAIL_ALREADY_EXISTS',

  BREED_NOT_FOUND = 'BREED_NOT_FOUND',
  BREED_ALREADY_EXISTS = 'BREED_ALREADY_EXISTS',

  IMAGE_NOT_FOUND = 'IMAGE_NOT_FOUND',
  IMAGE_UPLOAD_FAILED = 'IMAGE_UPLOAD_FAILED',

  EXTERNAL_API_ERROR = 'EXTERNAL_API_ERROR',
  CAT_API_ERROR = 'CAT_API_ERROR',

  DATABASE_CONNECTION_ERROR = 'DATABASE_CONNECTION_ERROR',
  DATABASE_QUERY_ERROR = 'DATABASE_QUERY_ERROR'
}

export abstract class AppError extends Error {
  abstract readonly statusCode: number;
  abstract readonly errorCode: ErrorCode;
  abstract readonly isOperational: boolean;

  constructor(message: string, public readonly context?: Record<string, any>) {
    super(message);
    this.name = this.constructor.name;
    if ((Error as any).captureStackTrace) {
      (Error as any).captureStackTrace(this, this.constructor);
    }
  }
}