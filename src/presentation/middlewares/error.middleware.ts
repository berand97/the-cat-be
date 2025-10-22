import { Request, Response, NextFunction } from 'express';
import { AppError } from '@core/errors/app-error';

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error occurred:', {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      error: error.errorCode,
      message: error.message,
      ...(error.context && { context: error.context })
    });
    return;
  }

  // Handle Mongoose validation errors
  if (error.name === 'ValidationError') {
    res.status(400).json({
      success: false,
      error: 'VALIDATION_ERROR',
      message: 'Validation failed',
      details: error.message
    });
    return;
  }

  // Handle Mongoose duplicate key errors
  if (error.name === 'MongoError' && (error as any).code === 11000) {
    res.status(400).json({
      success: false,
      error: 'DUPLICATE_KEY_ERROR',
      message: 'Duplicate key error',
      details: error.message
    });
    return;
  }

  // Handle JWT errors
  if (error.name === 'JsonWebTokenError') {
    res.status(401).json({
      success: false,
      error: 'TOKEN_INVALID',
      message: 'Invalid token'
    });
    return;
  }

  if (error.name === 'TokenExpiredError') {
    res.status(401).json({
      success: false,
      error: 'TOKEN_EXPIRED',
      message: 'Token has expired'
    });
    return;
  }

  // Handle class-validator errors
  if (error.name === 'BadRequestError') {
    res.status(400).json({
      success: false,
      error: 'VALIDATION_ERROR',
      message: error.message
    });
    return;
  }

  // Default error response
  res.status(500).json({
    success: false,
    error: 'INTERNAL_SERVER_ERROR',
    message: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : error.message
  });
};