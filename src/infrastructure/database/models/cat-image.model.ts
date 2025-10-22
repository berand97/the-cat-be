import { Schema, model } from 'mongoose';
import { ICatImageDocument } from '../interfaces';

const CatImageSchema = new Schema<ICatImageDocument>({
  imageId: { type: String, required: true, unique: true, index: true },
  url: { type: String, required: true },
  width: { type: Number, required: true, min: 1 },
  height: { type: Number, required: true, min: 1 },
  breeds: [{ type: String, index: true }],
  categories: [{ type: String }]
}, {
  timestamps: true,
  collection: 'cat_images'
});

CatImageSchema.index({ breeds: 1 });
CatImageSchema.index({ categories: 1 });

export const CatImageModel = model<ICatImageDocument>('CatImage', CatImageSchema);