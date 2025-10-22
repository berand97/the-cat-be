import { IRepository } from './base.repository.interface';
import { User } from '../entities/user.entity';

export interface IUserRepository extends IRepository<User> {
  findByEmail(email: string): Promise<User | null>;
  findActiveUsers(): Promise<User[]>;
  addFavoriteBreed(userId: string, breedId: string): Promise<User | null>;
  removeFavoriteBreed(userId: string, breedId: string): Promise<User | null>;
}