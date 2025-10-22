import { IRepository } from './base.repository.interface';
import { CatImage } from '../entities/cat-image.entity';

export interface ICatImageRepository extends IRepository<CatImage> {
  findByImageId(imageId: string): Promise<CatImage | null>;
  findByBreedId(breedId: string): Promise<CatImage[]>;
  findRandomImages(limit: number): Promise<CatImage[]>;
}