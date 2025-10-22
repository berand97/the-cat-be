import { BreedDto } from '@application/dtos/breed.dto';
import { Breed } from '@core/entities/breed.entity';

export class BreedMapper {
  static toDto(entity: Breed): BreedDto {
    const dto = new BreedDto();
    dto.id = entity.breedId;
    dto.name = entity.name;
    dto.description = entity.description;
    dto.temperament = entity.temperament;
    dto.origin = entity.origin;
    dto.countryCodes = entity.countryCodes;
    dto.countryCode = entity.countryCode;
    dto.lifeSpan = entity.lifeSpan;
    dto.indoor = entity.indoor;
    dto.lap = entity.lap;
    dto.altNames = entity.altNames;
    dto.adaptability = entity.adaptability;
    dto.affectionLevel = entity.affectionLevel;
    dto.childFriendly = entity.childFriendly;
    dto.dogFriendly = entity.dogFriendly;
    dto.energyLevel = entity.energyLevel;
    dto.grooming = entity.grooming;
    dto.healthIssues = entity.healthIssues;
    dto.intelligence = entity.intelligence;
    dto.sheddingLevel = entity.sheddingLevel;
    dto.socialNeeds = entity.socialNeeds;
    dto.strangerFriendly = entity.strangerFriendly;
    dto.vocalisation = entity.vocalisation;
    dto.experimental = entity.experimental;
    dto.hairless = entity.hairless;
    dto.natural = entity.natural;
    dto.rare = entity.rare;
    dto.rex = entity.rex;
    dto.suppressedTail = entity.suppressedTail;
    dto.shortLegs = entity.shortLegs;
    dto.wikipediaUrl = entity.wikipediaUrl;
    dto.hypoallergenic = entity.hypoallergenic;
    dto.referenceImageId = entity.referenceImageId;
    
    if (entity.image) {
      dto.image = {
        id: entity.image.id,
        width: entity.image.width,
        height: entity.image.height,
        url: entity.image.url
      };
    }
    
    dto.weight = {
      imperial: entity.weight.imperial,
      metric: entity.weight.metric
    };

    return dto;
  }

  static toEntity(dto: BreedDto): Breed {
    return new Breed({
      breedId: dto.id,
      name: dto.name,
      description: dto.description,
      temperament: dto.temperament,
      origin: dto.origin,
      countryCodes: dto.countryCodes,
      countryCode: dto.countryCode,
      lifeSpan: dto.lifeSpan,
      indoor: dto.indoor,
      lap: dto.lap,
      altNames: dto.altNames,
      adaptability: dto.adaptability,
      affectionLevel: dto.affectionLevel,
      childFriendly: dto.childFriendly,
      dogFriendly: dto.dogFriendly,
      energyLevel: dto.energyLevel,
      grooming: dto.grooming,
      healthIssues: dto.healthIssues,
      intelligence: dto.intelligence,
      sheddingLevel: dto.sheddingLevel,
      socialNeeds: dto.socialNeeds,
      strangerFriendly: dto.strangerFriendly,
      vocalisation: dto.vocalisation,
      experimental: dto.experimental,
      hairless: dto.hairless,
      natural: dto.natural,
      rare: dto.rare,
      rex: dto.rex,
      suppressedTail: dto.suppressedTail,
      shortLegs: dto.shortLegs,
      wikipediaUrl: dto.wikipediaUrl,
      hypoallergenic: dto.hypoallergenic,
      referenceImageId: dto.referenceImageId,
      image: dto.image ? {
        id: dto.image.id,
        width: dto.image.width,
        height: dto.image.height,
        url: dto.image.url
      } : undefined,
      weight: {
        imperial: dto.weight.imperial,
        metric: dto.weight.metric
      }
    });
  }

  static toDtoArray(entities: Breed[]): BreedDto[] {
    return entities.map(entity => this.toDto(entity));
  }

  static toEntityArray(dtos: BreedDto[]): Breed[] {
    return dtos.map(dto => this.toEntity(dto));
  }
}