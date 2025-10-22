import { Schema, model } from 'mongoose';
import { IBreedDocument } from '../interfaces';

const WeightSchema = new Schema({
  imperial: { type: String, required: true },
  metric: { type: String, required: true }
}, { _id: false });

const ImageSchema = new Schema({
  id: { type: String, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  url: { type: String, required: true }
}, { _id: false });

const BreedSchema = new Schema<IBreedDocument>({
  breedId: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true, index: true },
  description: { type: String, required: true },
  temperament: { type: String, required: true, index: true },
  origin: { type: String, required: true, index: true },
  countryCodes: { type: String, required: true },
  countryCode: { type: String, required: true },
  lifeSpan: { type: String, required: true },
  indoor: { type: Number, required: true, min: 0, max: 5 },
  lap: { type: Number, required: true, min: 0, max: 5 },
  altNames: { type: String },
  adaptability: { type: Number, required: true, min: 0, max: 5 },
  affectionLevel: { type: Number, required: true, min: 0, max: 5 },
  childFriendly: { type: Number, required: true, min: 0, max: 5 },
  dogFriendly: { type: Number, required: true, min: 0, max: 5 },
  energyLevel: { type: Number, required: true, min: 0, max: 5 },
  grooming: { type: Number, required: true, min: 0, max: 5 },
  healthIssues: { type: Number, required: true, min: 0, max: 5 },
  intelligence: { type: Number, required: true, min: 0, max: 5 },
  sheddingLevel: { type: Number, required: true, min: 0, max: 5 },
  socialNeeds: { type: Number, required: true, min: 0, max: 5 },
  strangerFriendly: { type: Number, required: true, min: 0, max: 5 },
  vocalisation: { type: Number, required: true, min: 0, max: 5 },
  experimental: { type: Number, required: true, min: 0, max: 1 },
  hairless: { type: Number, required: true, min: 0, max: 1 },
  natural: { type: Number, required: true, min: 0, max: 1 },
  rare: { type: Number, required: true, min: 0, max: 1 },
  rex: { type: Number, required: true, min: 0, max: 1 },
  suppressedTail: { type: Number, required: true, min: 0, max: 1 },
  shortLegs: { type: Number, required: true, min: 0, max: 1 },
  wikipediaUrl: { type: String },
  hypoallergenic: { type: Number, required: true, min: 0, max: 1 },
  referenceImageId: { type: String },
  image: { type: ImageSchema },
  weight: { type: WeightSchema, required: true }
}, {
  timestamps: true,
  collection: 'breeds'
});

BreedSchema.index({ name: 'text', temperament: 'text', origin: 'text' });
BreedSchema.index({ origin: 1, name: 1 });

export const BreedModel = model<IBreedDocument>('Breed', BreedSchema);