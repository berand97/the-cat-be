import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class SearchBreedsDto {
  @IsOptional()
  @IsString()
  q?: string;

  @IsOptional()
  @IsString()
  origin?: string;

  @IsOptional()
  @IsString()
  temperament?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  page?: number;
}

export class GetImagesDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(20)
  limit?: number;

  @IsOptional()
  @IsString()
  size?: 'small' | 'medium' | 'full';

  @IsOptional()
  @IsString()
  mimeTypes?: string;
}

export class AuthResponseDto {
  @IsString()
  token: string;

  @IsString()
  refreshToken: string;

  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}