import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import { AuthService } from '@application/services/auth.service';
import { UnauthorizedError, TokenInvalidError } from '@core/errors';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedError('Authorization header is required');
    }

    const token = authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      throw new UnauthorizedError('Token is required');
    }

    const authService = container.resolve(AuthService);
    const user = await authService.verifyToken(token);

    req.user = {
      id: user.id!,
      email: user.email
    };

    next();
  } catch (error) {
    if (error instanceof TokenInvalidError || error instanceof UnauthorizedError) {
      res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: error.message
      });
    } else {
      next(error);
    }
  }
};

export const optionalAuthMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(' ')[1];

      if (token) {
        const authService = container.resolve(AuthService);
        const user = await authService.verifyToken(token);

        req.user = {
          id: user.id!,
          email: user.email
        };
      }
    }

    next();
  } catch (error) {
    // For optional auth, we continue even if token is invalid
    next();
  }
};