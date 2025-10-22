import { Document } from 'mongoose';

export interface IUserDocument extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  favoriteBreeds: string[];
}