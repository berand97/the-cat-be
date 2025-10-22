import { Schema, model } from 'mongoose';
import { IUserDocument } from '../interfaces';

const UserSchema = new Schema<IUserDocument>({
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true,
    trim: true,
    index: true 
  },
  password: { type: String, required: true },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  isActive: { type: Boolean, default: true, index: true },
  favoriteBreeds: [{ type: String }]
}, {
  timestamps: true,
  collection: 'users'
});

UserSchema.virtual('fullName').get(function(this: IUserDocument) {
  return `${this.firstName} ${this.lastName}`.trim();
});

UserSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.password;
    return ret;
  }
});

export const UserModel = model<IUserDocument>('User', UserSchema);