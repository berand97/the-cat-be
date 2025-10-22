import { AuthResponseDto, CreateUserDto, LoginDto, UserDto } from '@application/dtos';
import { AuthTokens, TokenPayload } from '@application/interfaces';
import { UserMapper } from '@application/mappers';
import { config } from '@config/index.js';
import { User } from '@core/entities/user.entity';
import {
  EmailAlreadyExistsError,
  InvalidCredentialsError,
  UserNotFoundError
} from '@core/errors';
import { IUserRepository } from '@core/repositories/user.repository.interface';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

@injectable()
export class AuthService {
  constructor(
    @inject('IUserRepository') private userRepository: IUserRepository
  ) { }

  async register(createUserDto: CreateUserDto): Promise<AuthResponseDto> {
    const existingUser = await this.userRepository.findByEmail(createUserDto.email);

    if (existingUser) {
      throw new EmailAlreadyExistsError(createUserDto.email);
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, config.auth.bcrypt.saltRounds);

    const userData = UserMapper.toEntity(createUserDto);
    userData.password = hashedPassword;

    const savedUser = await this.userRepository.create(userData);

    const tokens = this.generateTokens(savedUser);

    return {
      ...tokens,
      user: {
        id: savedUser.id!,
        email: savedUser.email,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName
      }
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.userRepository.findByEmail(loginDto.email);

    if (!user || !user.isActive) {
      throw new InvalidCredentialsError();
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    const tokens = this.generateTokens(user);

    return {
      ...tokens,
      user: {
        id: user.id!,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    };
  }

  async refreshToken(refreshToken: string): Promise<AuthResponseDto> {
    try {
      const decoded = jwt.verify(refreshToken, config.auth.jwt.secret) as TokenPayload;

      const user = await this.userRepository.findById(decoded.userId);

      if (!user || !user.isActive) {
        throw new UserNotFoundError();
      }

      const tokens = this.generateTokens(user);

      return {
        ...tokens,
        user: {
          id: user.id!,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        }
      };
    } catch (error) {
      throw new InvalidCredentialsError();
    }
  }

  async getUserProfile(userId: string): Promise<UserDto> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError(userId);
    }

    return UserMapper.toDto(user);
  }

  private generateTokens(user: User): AuthTokens {
    const payload: TokenPayload = {
      userId: user.id!,
      email: user.email
    };

    const token = jwt.sign(payload, config.auth.jwt.secret, {
      expiresIn: config.auth.jwt.expiresIn as jwt.SignOptions['expiresIn']
    });

    const refreshToken = jwt.sign(payload, config.auth.jwt.secret, {
      expiresIn: config.auth.jwt.refreshExpiresIn as jwt.SignOptions['expiresIn']
    });

    return { token, refreshToken };
  }

  async verifyToken(token: string): Promise<User> {
    try {
      const decoded = jwt.verify(token, config.auth.jwt.secret) as TokenPayload;

      const user = await this.userRepository.findById(decoded.userId);

      if (!user || !user.isActive) {
        throw new UserNotFoundError();
      }

      return user;
    } catch (error) {
      throw new InvalidCredentialsError();
    }
  }
}