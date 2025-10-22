import { AuthService } from '../../src/application/services/auth.service';
import { UserBuilder, CreateUserDtoBuilder, LoginDtoBuilder } from '../builders/user.builder';

describe('AuthService', () => {
  let authService: AuthService;
  let mockUserRepository: any;

  beforeEach(() => {
    mockUserRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
      save: jest.fn()
    };
    authService = new AuthService(mockUserRepository);
  });

  describe('register', () => {
    it('should check if email exists', async () => {
      const createUserDto = CreateUserDtoBuilder.create().build();
      
      mockUserRepository.findByEmail.mockResolvedValue(null);
      
      try {
        await authService.register(createUserDto);
      } catch (error) {
      }
      
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(createUserDto.email);
    });
  });

  describe('login', () => {
    it('should check if user exists', async () => {
      const loginDto = LoginDtoBuilder.create().build();

      mockUserRepository.findByEmail.mockResolvedValue(null);

      try {
        await authService.login(loginDto);
      } catch (error) {
      }
      
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(loginDto.email);
    });
  });
});