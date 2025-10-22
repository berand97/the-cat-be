import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, IsUrl, Max, Min } from 'class-validator';

export class WeightDto {
  @IsString()
  imperial: string;

  @IsString()
  metric: string;
}

export class ImageDto {
  @IsString()
  id: string;

  @IsNumber()
  @Min(1)
  width: number;

  @IsNumber()
  @Min(1)
  height: number;

  @IsUrl()
  url: string;
}

export class BreedDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  temperament: string;

  @IsString()
  origin: string;

  @IsString()
  countryCodes: string;

  @IsString()
  countryCode: string;

  @IsString()
  lifeSpan: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  indoor: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  lap: number;

  @IsOptional()
  @IsString()
  altNames?: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  adaptability: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  affectionLevel: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  childFriendly: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  dogFriendly: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  energyLevel: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  grooming: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  healthIssues: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  intelligence: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  sheddingLevel: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  socialNeeds: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  strangerFriendly: number;

  @IsNumber()
  @Min(0)
  @Max(5)
  vocalisation: number;

  @IsNumber()
  @Min(0)
  @Max(1)
  experimental: number;

  @IsNumber()
  @Min(0)
  @Max(1)
  hairless: number;

  @IsNumber()
  @Min(0)
  @Max(1)
  natural: number;

  @IsNumber()
  @Min(0)
  @Max(1)
  rare: number;

  @IsNumber()
  @Min(0)
  @Max(1)
  rex: number;

  @IsNumber()
  @Min(0)
  @Max(1)
  suppressedTail: number;

  @IsNumber()
  @Min(0)
  @Max(1)
  shortLegs: number;

  @IsOptional()
  @IsUrl()
  wikipediaUrl?: string;

  @IsNumber()
  @Min(0)
  @Max(1)
  hypoallergenic: number;

  @IsOptional()
  @IsString()
  referenceImageId?: string;

  @IsOptional()
  @Type(() => ImageDto)
  image?: ImageDto;

  @Type(() => WeightDto)
  weight: WeightDto;
}