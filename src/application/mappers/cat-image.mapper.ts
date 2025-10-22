import { CatImageDto } from '@application/dtos/cat-image.dto';
import { CatImage } from '@core/entities/cat-image.entity';

export class CatImageMapper {
  static toDto(entity: CatImage): CatImageDto {
    const dto = new CatImageDto();
    dto.id = entity.imageId;
    dto.url = entity.url;
    dto.width = entity.width;
    dto.height = entity.height;
    dto.breeds = entity.breeds;
    dto.categories = entity.categories;
    return dto;
  }

  static toEntity(dto: CatImageDto): CatImage {
    return new CatImage({
      imageId: dto.id,
      url: dto.url,
      width: dto.width,
      height: dto.height,
      breeds: dto.breeds,
      categories: dto.categories
    });
  }

  static toDtoArray(entities: CatImage[]): CatImageDto[] {
    return entities.map(entity => this.toDto(entity));
  }

  static toEntityArray(dtos: CatImageDto[]): CatImage[] {
    return dtos.map(dto => this.toEntity(dto));
  }
}