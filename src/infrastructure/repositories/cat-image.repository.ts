import { injectable } from 'tsyringe';
import { ICatImageRepository } from '@core/repositories/cat-image.repository.interface';
import { CatImage } from '@core/entities/cat-image.entity';
import { BaseRepository } from './base.repository';
import { CatImageModel } from '@infrastructure/database/models/cat-image.model';
import { Document } from 'mongoose';

interface ICatImageDocument extends Document {
  imageId: string;
  url: string;
  width: number;
  height: number;
  breeds: string[];
  categories?: string[];
  createdAt: Date;
  updatedAt: Date;
}

@injectable()
export class CatImageRepository extends BaseRepository<CatImage, ICatImageDocument> implements ICatImageRepository {
  constructor() {
    super(CatImageModel as any);
  }

  async findByImageId(imageId: string): Promise<CatImage | null> {
    const document = await this.model.findOne({ imageId }).exec();
    return document ? this.mapToEntity(document) : null;
  }

  async findByBreedId(breedId: string): Promise<CatImage[]> {
    const documents = await this.model.find({ breeds: breedId }).exec();
    return documents.map(doc => this.mapToEntity(doc));
  }

  async findRandomImages(limit: number): Promise<CatImage[]> {
    const documents = await this.model.aggregate([
      { $sample: { size: limit } }
    ]);
    return documents.map(doc => this.mapToEntity(doc));
  }

  protected mapToEntity(document: ICatImageDocument): CatImage {
    return new CatImage({
      id: document._id?.toString(),
      imageId: document.imageId,
      url: document.url,
      width: document.width,
      height: document.height,
      breeds: document.breeds,
      categories: document.categories,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt
    });
  }
}