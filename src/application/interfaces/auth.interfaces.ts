import { JwtPayload } from 'jsonwebtoken';

export interface TokenPayload extends JwtPayload {
  userId: string;
  email: string;
}

export interface AuthTokens {
  token: string;
  refreshToken: string;
}

export interface TokenGenerationOptions {
  accessTokenExpiry?: string;
  refreshTokenExpiry?: string;
}