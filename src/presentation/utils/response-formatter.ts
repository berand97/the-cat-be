export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  details?: any;
  total?: number;
  timestamp?: string;
}

export const formatSuccessResponse = <T>(
  data: T, 
  statusCode: number = 200, 
  message?: string,
  total?: number
): ApiResponse<T> => {
  const response: ApiResponse<T> = {
    success: true,
    data,
    timestamp: new Date().toISOString()
  };

  if (message) response.message = message;
  if (total !== undefined) response.total = total;
  
  return response;
};

export const formatErrorResponse = (
  error: string,
  details?: any,
  statusCode: number = 400
): ApiResponse => ({
  success: false,
  error,
  details,
  timestamp: new Date().toISOString()
});

export const formatValidationErrorResponse = (errors: any[]): ApiResponse => ({
  success: false,
  error: 'Validation failed',
  details: errors.map(err => ({
    property: err.property,
    constraints: err.constraints
  })),
  timestamp: new Date().toISOString()
});