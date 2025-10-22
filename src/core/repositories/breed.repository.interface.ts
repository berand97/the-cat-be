import { IRepository } from './base.repository.interface';
import { Breed } from '../entities/breed.entity';

export interface IBreedRepository extends IRepository<Breed> {
  findByBreedId(breedId: string): Promise<Breed | null>;
  searchByName(query: string): Promise<Breed[]>;
  findByOrigin(origin: string): Promise<Breed[]>;
  findByTemperament(temperament: string): Promise<Breed[]>;
}