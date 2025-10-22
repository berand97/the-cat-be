import { AuthController } from '../../src/presentation/controllers/auth.controller';
import { CreateUserDtoBuilder, LoginDtoBuilder } from '../builders/user.builder';

describe('AuthController', () => {
  let authController: AuthController;
  let mockAuthService: any;

  beforeEach(() => {
    mockAuthService = {
      register: jest.fn(),
      login: jest.fn(),
      refreshToken: jest.fn(),
      getUserProfile: jest.fn(),
      verifyToken: jest.fn()
    };
    
    authController = new AuthController(mockAuthService);
  });

  describe('initialization', () => {
    it('should create instance successfully', () => {
      expect(authController).toBeInstanceOf(AuthController);
    });
  });

  describe('methods exist', () => {
    it('should have register method', () => {
      expect(typeof authController.register).toBe('function');
    });

    it('should have login method', () => {
      expect(typeof authController.login).toBe('function');
    });
  });

  describe('register', () => {
    it('should call authService register method', async () => {
      const createUserDto = CreateUserDtoBuilder.create().build();
      const mockReq = { body: createUserDto };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const mockNext = jest.fn();

      mockAuthService.register.mockResolvedValue({
        user: { id: '1', email: createUserDto.email },
        token: 'jwt-token'
      });

      await authController.register(mockReq as any, mockRes as any, mockNext);

      expect(mockAuthService.register).toHaveBeenCalledWith(createUserDto);
      expect(mockRes.status).toHaveBeenCalledWith(201);
    });
  });

  describe('login', () => {
    it('should call authService login method', async () => {
      const loginDto = LoginDtoBuilder.create().build();
      const mockReq = { body: loginDto };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const mockNext = jest.fn();

      mockAuthService.login.mockResolvedValue({
        user: { id: '1', email: loginDto.email },
        token: 'jwt-token'
      });

      await authController.login(mockReq as any, mockRes as any, mockNext);

      expect(mockAuthService.login).toHaveBeenCalledWith(loginDto);
    });
  });
});