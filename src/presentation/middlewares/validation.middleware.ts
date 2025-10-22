import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToClass, ClassConstructor } from 'class-transformer';
import { formatValidationErrorResponse } from '@presentation/utils';

export type ValidationSource = 'body' | 'query' | 'params';

export interface ValidationOptions {
  enableImplicitConversion?: boolean;
  skipMissingProperties?: boolean;
}

export const validateDto = <T extends object>(
  dtoClass: ClassConstructor<T>,
  source: ValidationSource = 'body',
  options: ValidationOptions = {}
) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { enableImplicitConversion = false, skipMissingProperties = false } = options;
      
      const sourceData = req[source];
      
      const dto = plainToClass(dtoClass, sourceData, {
        enableImplicitConversion,
      });

      const errors = await validate(dto, {
        skipMissingProperties,
      });

      if (errors.length > 0) {
        const errorResponse = formatValidationErrorResponse(errors);
        res.status(400).json(errorResponse);
        return;
      }

      (req as any).validatedData = dto;
      req[source] = dto;
      next();
    } catch (error) {
      next(error);
    }
  };
};

export const validateQuery = <T extends object>(
  dtoClass: ClassConstructor<T>, 
  options?: ValidationOptions
) => {
  return validateDto(dtoClass, 'query', { enableImplicitConversion: true, ...options });
};

export const validateParams = <T extends object>(
  dtoClass: ClassConstructor<T>, 
  options?: ValidationOptions
) => {
  return validateDto(dtoClass, 'params', options);
};

export const validateBody = <T extends object>(
  dtoClass: ClassConstructor<T>, 
  options?: ValidationOptions
) => {
  return validateDto(dtoClass, 'body', options);
};