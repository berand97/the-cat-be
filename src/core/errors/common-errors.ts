import { AppError, ErrorCode } from './app-error';

export class NotFoundError extends AppError {
  readonly statusCode = 404;
  readonly errorCode = ErrorCode.NOT_FOUND;
  readonly isOperational = true;

  constructor(resource: string, id?: string, context?: Record<string, any>) {
    const message = id ? `${resource} with id ${id} not found` : `${resource} not found`;
    super(message, context);
  }
}

export class ValidationError extends AppError {
  readonly statusCode = 400;
  readonly errorCode = ErrorCode.VALIDATION_ERROR;
  readonly isOperational = true;

  constructor(message: string, context?: Record<string, any>) {
    super(message, context);
  }
}

export class UnauthorizedError extends AppError {
  readonly statusCode = 401;
  readonly errorCode = ErrorCode.UNAUTHORIZED;
  readonly isOperational = true;

  constructor(message: string = 'Unauthorized access', context?: Record<string, any>) {
    super(message, context);
  }
}

export class ForbiddenError extends AppError {
  readonly statusCode = 403;
  readonly errorCode = ErrorCode.FORBIDDEN;
  readonly isOperational = true;

  constructor(message: string = 'Forbidden access', context?: Record<string, any>) {
    super(message, context);
  }
}

export class BadRequestError extends AppError {
  readonly statusCode = 400;
  readonly errorCode = ErrorCode.BAD_REQUEST;
  readonly isOperational = true;

  constructor(message: string, context?: Record<string, any>) {
    super(message, context);
  }
}

export class InternalServerError extends AppError {
  readonly statusCode = 500;
  readonly errorCode = ErrorCode.INTERNAL_SERVER_ERROR;
  readonly isOperational = false;

  constructor(message: string = 'Internal server error', context?: Record<string, any>) {
    super(message, context);
  }
}