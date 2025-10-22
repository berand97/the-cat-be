import { Document } from 'mongoose';

export interface ICatImageDocument extends Document {
  imageId: string;
  url: string;
  width: number;
  height: number;
  breeds: string[];
  categories?: string[];
}