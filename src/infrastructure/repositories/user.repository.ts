import { injectable } from 'tsyringe';
import { IUserRepository } from '@core/repositories/user.repository.interface';
import { User } from '@core/entities/user.entity';
import { BaseRepository } from './base.repository';
import { UserModel } from '@infrastructure/database/models/user.model';
import { Document } from 'mongoose';

interface IUserDocument extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  favoriteBreeds: string[];
  createdAt: Date;
  updatedAt: Date;
}

@injectable()
export class UserRepository extends BaseRepository<User, IUserDocument> implements IUserRepository {
  constructor() {
    super(UserModel as any);
  }

  async findByEmail(email: string): Promise<User | null> {
    const document = await this.model.findOne({ email: email.toLowerCase() }).exec();
    return document ? this.mapToEntity(document) : null;
  }

  async findActiveUsers(): Promise<User[]> {
    const documents = await this.model.find({ isActive: true }).exec();
    return documents.map(doc => this.mapToEntity(doc));
  }

  async addFavoriteBreed(userId: string, breedId: string): Promise<User | null> {
    const document = await this.model
      .findByIdAndUpdate(
        userId,
        { $addToSet: { favoriteBreeds: breedId } },
        { new: true, runValidators: true }
      )
      .exec();
    return document ? this.mapToEntity(document) : null;
  }

  async removeFavoriteBreed(userId: string, breedId: string): Promise<User | null> {
    const document = await this.model
      .findByIdAndUpdate(
        userId,
        { $pull: { favoriteBreeds: breedId } },
        { new: true, runValidators: true }
      )
      .exec();
    return document ? this.mapToEntity(document) : null;
  }

  protected mapToEntity(document: IUserDocument): User {
    return new User({
      id: document._id?.toString(),
      email: document.email,
      password: document.password,
      firstName: document.firstName,
      lastName: document.lastName,
      isActive: document.isActive,
      favoriteBreeds: document.favoriteBreeds,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt
    });
  }
}