import { Request, Response, NextFunction } from 'express';
import { validateBody } from '../../src/presentation/middlewares/validation.middleware';
import { formatSuccessResponse, formatErrorResponse } from '../../src/presentation/utils/response-formatter';
import { CreateUserDto } from '../../src/application/dtos';

describe('Validation Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    mockNext = jest.fn();
    jest.clearAllMocks();
  });

  describe('validateBody', () => {
    it('should call next when validation passes', async () => {
      mockRequest.body = {
        email: 'test@example.com',
        password: 'validPassword123',
        firstName: 'Test',
        lastName: 'User'
      };

      const middleware = validateBody(CreateUserDto);
      await middleware(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
    });

    it('should return 400 when validation fails', async () => {
      mockRequest.body = {
        email: 'invalid-email',
        password: '123'
      };

      const middleware = validateBody(CreateUserDto);
      await middleware(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          error: 'Validation failed'
        })
      );
      expect(mockNext).not.toHaveBeenCalled();
    });
  });
});

describe('Response Formatters', () => {
  describe('formatSuccessResponse', () => {
    it('should format success response correctly', () => {
      const data = { id: 1, name: 'Test' };
      const result = formatSuccessResponse(data, 200, 'Success message', 5);

      expect(result).toEqual({
        success: true,
        data,
        message: 'Success message',
        total: 5,
        timestamp: expect.any(String)
      });
    });

    it('should format simple success response', () => {
      const data = { id: 1 };
      const result = formatSuccessResponse(data);

      expect(result).toEqual({
        success: true,
        data,
        timestamp: expect.any(String)
      });
    });
  });

  describe('formatErrorResponse', () => {
    it('should format error response correctly', () => {
      const result = formatErrorResponse('VALIDATION_ERROR', { field: 'email' }, 400);

      expect(result).toEqual({
        success: false,
        error: 'VALIDATION_ERROR',
        details: { field: 'email' },
        timestamp: expect.any(String)
      });
    });
  });
});