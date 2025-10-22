import { CreateUserDto, UpdateUserDto, UserDto } from '@application/dtos/user.dto';
import { User } from '@core/entities/user.entity';

export class UserMapper {
  static toDto(entity: User): UserDto {
    const dto = new UserDto();
    dto.id = entity.id || '';
    dto.email = entity.email;
    dto.firstName = entity.firstName;
    dto.lastName = entity.lastName;
    dto.isActive = entity.isActive;
    dto.favoriteBreeds = entity.favoriteBreeds;
    dto.fullName = entity.fullName;
    return dto;
  }

  static toEntity(dto: CreateUserDto): User {
    return new User({
      email: dto.email,
      password: dto.password,
      firstName: dto.firstName,
      lastName: dto.lastName,
      isActive: true,
      favoriteBreeds: []
    });
  }

  static updateEntity(entity: User, dto: UpdateUserDto): User {
    if (dto.firstName !== undefined) {
      entity.firstName = dto.firstName;
    }
    if (dto.lastName !== undefined) {
      entity.lastName = dto.lastName;
    }
    if (dto.isActive !== undefined) {
      entity.isActive = dto.isActive;
    }
    return entity;
  }

  static toDtoArray(entities: User[]): UserDto[] {
    return entities.map(entity => this.toDto(entity));
  }

  static toPublicDto(entity: User): Omit<UserDto, 'favoriteBreeds'> {
    const dto = this.toDto(entity);
    const { favoriteBreeds, ...publicDto } = dto;
    return publicDto;
  }
}