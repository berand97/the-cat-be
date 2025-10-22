import { AppError, ErrorCode } from './app-error';

export class InvalidCredentialsError extends AppError {
  readonly statusCode = 401;
  readonly errorCode = ErrorCode.INVALID_CREDENTIALS;
  readonly isOperational = true;

  constructor(context?: Record<string, any>) {
    super('Invalid email or password', context);
  }
}

export class TokenExpiredError extends AppError {
  readonly statusCode = 401;
  readonly errorCode = ErrorCode.TOKEN_EXPIRED;
  readonly isOperational = true;

  constructor(context?: Record<string, any>) {
    super('Token has expired', context);
  }
}

export class TokenInvalidError extends AppError {
  readonly statusCode = 401;
  readonly errorCode = ErrorCode.TOKEN_INVALID;
  readonly isOperational = true;

  constructor(context?: Record<string, any>) {
    super('Invalid token', context);
  }
}

export class UserNotFoundError extends AppError {
  readonly statusCode = 404;
  readonly errorCode = ErrorCode.USER_NOT_FOUND;
  readonly isOperational = true;

  constructor(identifier?: string, context?: Record<string, any>) {
    const message = identifier ? `User with ${identifier} not found` : 'User not found';
    super(message, context);
  }
}

export class EmailAlreadyExistsError extends AppError {
  readonly statusCode = 400;
  readonly errorCode = ErrorCode.EMAIL_ALREADY_EXISTS;
  readonly isOperational = true;

  constructor(email: string, context?: Record<string, any>) {
    super(`Email ${email} already exists`, context);
  }
}

export class BreedNotFoundError extends AppError {
  readonly statusCode = 404;
  readonly errorCode = ErrorCode.BREED_NOT_FOUND;
  readonly isOperational = true;

  constructor(breedId: string, context?: Record<string, any>) {
    super(`Breed with id ${breedId} not found`, context);
  }
}

export class ImageNotFoundError extends AppError {
  readonly statusCode = 404;
  readonly errorCode = ErrorCode.IMAGE_NOT_FOUND;
  readonly isOperational = true;

  constructor(imageId: string, context?: Record<string, any>) {
    super(`Image with id ${imageId} not found`, context);
  }
}

export class ExternalApiError extends AppError {
  readonly statusCode = 502;
  readonly errorCode = ErrorCode.EXTERNAL_API_ERROR;
  readonly isOperational = true;

  constructor(service: string, message?: string, context?: Record<string, any>) {
    super(`External API error from ${service}: ${message || 'Unknown error'}`, context);
  }
}

export class CatApiError extends AppError {
  readonly statusCode = 502;
  readonly errorCode = ErrorCode.CAT_API_ERROR;
  readonly isOperational = true;

  constructor(message?: string, context?: Record<string, any>) {
    super(`The Cat API error: ${message || 'Unknown error'}`, context);
  }
}