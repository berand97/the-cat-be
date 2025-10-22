import { IsArray, IsNumber, IsOptional, IsString, IsUrl, Min } from 'class-validator';

export class CatImageDto {
  @IsString()
  id: string;

  @IsUrl()
  url: string;

  @IsNumber()
  @Min(1)
  width: number;

  @IsNumber()
  @Min(1)
  height: number;

  @IsArray()
  @IsString({ each: true })
  breeds: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categories?: string[];
}