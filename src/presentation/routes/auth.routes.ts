import { Router } from 'express';
import { container } from 'tsyringe';
import { AuthController } from '@presentation/controllers/auth.controller';
import { authMiddleware, validateBody } from '../middlewares';
import { CreateUserDto, LoginDto, RefreshTokenDto } from '@application/dtos';

const router = Router();

const getController = () => {
  return container.resolve(AuthController);
};

router.post('/register', 
  validateBody(CreateUserDto),
  (req, res, next) => getController().register(req, res, next)
);

router.post('/login', 
  validateBody(LoginDto),
  (req, res, next) => getController().login(req, res, next)
);

router.post('/refresh', 
  validateBody(RefreshTokenDto),
  (req, res, next) => getController().refreshToken(req, res, next)
);

router.get('/profile', 
  authMiddleware, 
  (req, res, next) => getController().getProfile(req, res, next)
);

router.post('/logout', 
  authMiddleware, 
  (req, res, next) => getController().logout(req, res, next)
);

export default router;