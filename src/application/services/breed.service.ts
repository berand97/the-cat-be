import config from '@/config';
import { BreedDto, SearchBreedsDto } from '@application/dtos';
import { BreedMapper } from '@application/mappers';
import { Breed } from '@core/entities/breed.entity';
import { BreedNotFoundError } from '@core/errors';
import { IBreedRepository } from '@core/repositories/breed.repository.interface';
import axios from 'axios';
import { inject, injectable } from 'tsyringe';

@injectable()
export class BreedService {
  constructor(
    @inject('IBreedRepository') private breedRepository: IBreedRepository
  ) { }

  async getAllBreeds(searchDto?: SearchBreedsDto): Promise<BreedDto[]> {
    const limit = searchDto?.limit || 10;
    const page = searchDto?.page;
    const offset = page! * limit;

    let breeds: Breed[];

    if (searchDto?.q) {
      breeds = await this.breedRepository.searchByName(searchDto.q);
    } else if (searchDto?.origin) {
      breeds = await this.breedRepository.findByOrigin(searchDto.origin);
    } else if (searchDto?.temperament) {
      breeds = await this.breedRepository.findByTemperament(searchDto.temperament);
    } else {
      breeds = await this.breedRepository.findAll({
        limit,
        offset,
        sort: { name: 1 }
      });
    }

    return BreedMapper.toDtoArray(breeds);
  }

  async getBreedById(breedId: string): Promise<BreedDto> {
    const breed = await this.breedRepository.findByBreedId(breedId);

    if (!breed) {
      throw new BreedNotFoundError(breedId);
    }

    return BreedMapper.toDto(breed);
  }

  async searchBreeds(query: string): Promise<BreedDto[]> {
    const breeds = await this.breedRepository.searchByName(query);
    return BreedMapper.toDtoArray(breeds);
  }

  async syncBreedsFromCatApi(): Promise<void> {
    try {
      const catApiUrl = config.externalApis.catApi.url;
      const catApiKey = config.externalApis.catApi.key;

      const headers = catApiKey ? { 'x-api-key': catApiKey } : {};

      const response = await axios.get(`${catApiUrl}/breeds`, { headers });
      const apiBreeds = response.data;

      for (const apiBreed of apiBreeds) {
        const existingBreed = await this.breedRepository.findByBreedId(apiBreed.id);

        if (!existingBreed) {
          const breed = new Breed({
            breedId: apiBreed.id,
            name: apiBreed.name,
            description: apiBreed.description,
            temperament: apiBreed.temperament,
            origin: apiBreed.origin,
            countryCodes: apiBreed.country_codes,
            countryCode: apiBreed.country_code,
            lifeSpan: apiBreed.life_span,
            indoor: apiBreed.indoor,
            lap: apiBreed.lap,
            altNames: apiBreed.alt_names,
            adaptability: apiBreed.adaptability,
            affectionLevel: apiBreed.affection_level,
            childFriendly: apiBreed.child_friendly,
            dogFriendly: apiBreed.dog_friendly,
            energyLevel: apiBreed.energy_level,
            grooming: apiBreed.grooming,
            healthIssues: apiBreed.health_issues,
            intelligence: apiBreed.intelligence,
            sheddingLevel: apiBreed.shedding_level,
            socialNeeds: apiBreed.social_needs,
            strangerFriendly: apiBreed.stranger_friendly,
            vocalisation: apiBreed.vocalisation,
            experimental: apiBreed.experimental,
            hairless: apiBreed.hairless,
            natural: apiBreed.natural,
            rare: apiBreed.rare,
            rex: apiBreed.rex,
            suppressedTail: apiBreed.suppressed_tail,
            shortLegs: apiBreed.short_legs,
            wikipediaUrl: apiBreed.wikipedia_url,
            hypoallergenic: apiBreed.hypoallergenic,
            referenceImageId: apiBreed.reference_image_id,
            image: apiBreed.image,
            weight: apiBreed.weight || { imperial: '', metric: '' }
          });

          await this.breedRepository.create(breed);
        }
      }
    } catch (error: any) {
      throw new Error(`Failed to sync breeds from Cat API: ${error.message}`);
    }
  }
}