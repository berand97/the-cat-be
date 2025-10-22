import { injectable } from 'tsyringe';
import { IBreedRepository } from '@core/repositories/breed.repository.interface';
import { Breed } from '@core/entities/breed.entity';
import { BaseRepository } from './base.repository';
import { BreedModel } from '@infrastructure/database/models/breed.model';
import { Document } from 'mongoose';

interface IBreedDocument extends Document {
  breedId: string;
  name: string;
  description: string;
  temperament: string;
  origin: string;
  countryCodes: string;
  countryCode: string;
  lifeSpan: string;
  indoor: number;
  lap: number;
  altNames?: string;
  adaptability: number;
  affectionLevel: number;
  childFriendly: number;
  dogFriendly: number;
  energyLevel: number;
  grooming: number;
  healthIssues: number;
  intelligence: number;
  sheddingLevel: number;
  socialNeeds: number;
  strangerFriendly: number;
  vocalisation: number;
  experimental: number;
  hairless: number;
  natural: number;
  rare: number;
  rex: number;
  suppressedTail: number;
  shortLegs: number;
  wikipediaUrl?: string;
  hypoallergenic: number;
  referenceImageId?: string;
  image?: any;
  weight: any;
  createdAt: Date;
  updatedAt: Date;
}

@injectable()
export class BreedRepository extends BaseRepository<Breed, IBreedDocument> implements IBreedRepository {
  constructor() {
    super(BreedModel as any);
  }

  async findByBreedId(breedId: string): Promise<Breed | null> {
    const document = await this.model.findOne({ breedId }).exec();
    return document ? this.mapToEntity(document) : null;
  }

  async searchByName(query: string): Promise<Breed[]> {
    const documents = await this.model
      .find({ 
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { altNames: { $regex: query, $options: 'i' } }
        ]
      })
      .exec();
    return documents.map(doc => this.mapToEntity(doc));
  }

  async findByOrigin(origin: string): Promise<Breed[]> {
    const documents = await this.model
      .find({ origin: { $regex: origin, $options: 'i' } })
      .exec();
    return documents.map(doc => this.mapToEntity(doc));
  }

  async findByTemperament(temperament: string): Promise<Breed[]> {
    const documents = await this.model
      .find({ temperament: { $regex: temperament, $options: 'i' } })
      .exec();
    return documents.map(doc => this.mapToEntity(doc));
  }

  protected mapToEntity(document: IBreedDocument): Breed {
    return new Breed({
      id: document._id?.toString(),
      breedId: document.breedId,
      name: document.name,
      description: document.description,
      temperament: document.temperament,
      origin: document.origin,
      countryCodes: document.countryCodes,
      countryCode: document.countryCode,
      lifeSpan: document.lifeSpan,
      indoor: document.indoor,
      lap: document.lap,
      altNames: document.altNames,
      adaptability: document.adaptability,
      affectionLevel: document.affectionLevel,
      childFriendly: document.childFriendly,
      dogFriendly: document.dogFriendly,
      energyLevel: document.energyLevel,
      grooming: document.grooming,
      healthIssues: document.healthIssues,
      intelligence: document.intelligence,
      sheddingLevel: document.sheddingLevel,
      socialNeeds: document.socialNeeds,
      strangerFriendly: document.strangerFriendly,
      vocalisation: document.vocalisation,
      experimental: document.experimental,
      hairless: document.hairless,
      natural: document.natural,
      rare: document.rare,
      rex: document.rex,
      suppressedTail: document.suppressedTail,
      shortLegs: document.shortLegs,
      wikipediaUrl: document.wikipediaUrl,
      hypoallergenic: document.hypoallergenic,
      referenceImageId: document.referenceImageId,
      image: document.image,
      weight: document.weight,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt
    });
  }
}