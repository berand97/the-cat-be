import { BaseEntity } from './base.entity';

export class User extends BaseEntity {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  favoriteBreeds: string[];

  constructor(data?: Partial<User>) {
    super(data);
    this.email = data?.email || '';
    this.password = data?.password || '';
    this.firstName = data?.firstName || '';
    this.lastName = data?.lastName || '';
    this.isActive = data?.isActive ?? true;
    this.favoriteBreeds = data?.favoriteBreeds || [];
  }

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`.trim();
  }
}