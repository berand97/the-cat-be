export type Environment = 'development' | 'production' | 'test';

export type LogLevel = 'error' | 'warn' | 'info' | 'debug';

export type SortOrder = 1 | -1;

export type AuthenticatedUser = {
  id: string;
  email: string;
};

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
}