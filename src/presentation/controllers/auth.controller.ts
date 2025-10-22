import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'tsyringe';
import { AuthService } from '@application/services/auth.service';
import { formatSuccessResponse } from '@presentation/utils';

@injectable()
export class AuthController {
  constructor(
    @inject(AuthService) private authService: AuthService
  ) {}

  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authResponse = await this.authService.register(req.body);
      const response = formatSuccessResponse(authResponse, 201);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authResponse = await this.authService.login(req.body);
      const response = formatSuccessResponse(authResponse);
      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { refreshToken } = req.body;
      const authResponse = await this.authService.refreshToken(refreshToken);
      const response = formatSuccessResponse(authResponse);
      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = (req as any).user?.id;
      const userProfile = await this.authService.getUserProfile(userId);
      const response = formatSuccessResponse(userProfile);
      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const response = formatSuccessResponse(null, 200, 'Logged out successfully');
      res.json(response);
    } catch (error) {
      next(error);
    }
  };
}