import { mockDeep } from 'jest-mock-extended';
import { IUserRepository } from '../../src/core/repositories/user.repository.interface';
import { IBreedRepository } from '../../src/core/repositories/breed.repository.interface';

export const createMockUserRepository = () => mockDeep<IUserRepository>();
export const createMockBreedRepository = () => mockDeep<IBreedRepository>();

export const mockConfig = {
  auth: {
    jwt: {
      secret: 'test-secret',
      expiresIn: '1h',
      refreshExpiresIn: '7d'
    },
    bcrypt: {
      saltRounds: 10
    }
  },
  server: {
    nodeEnv: 'test'
  }
};