import { injectable, inject } from 'tsyringe';
import { ICatImageRepository } from '@core/repositories/cat-image.repository.interface';
import { CatImage } from '@core/entities/cat-image.entity';
import { CatImageDto, GetImagesDto } from '@application/dtos';
import { CatImageMapper } from '@application/mappers';
import { ImageNotFoundError, CatApiError } from '@core/errors';
import axios from 'axios';
import config from '@/config';

const catApiUrl = config.externalApis.catApi.url;
const catApiKey = config.externalApis.catApi.key;

@injectable()
export class CatImageService {
  constructor(
    @inject('ICatImageRepository') private catImageRepository: ICatImageRepository
  ) { }

  async getImagesByBreed(breedId: string, getImagesDto?: GetImagesDto): Promise<CatImageDto[]> {
    const limit = getImagesDto?.limit || 10;

    const localImages = await this.catImageRepository.findByBreedId(breedId);

    if (localImages.length >= limit) {
      return CatImageMapper.toDtoArray(localImages.slice(0, limit));
    }

    try {
      await this.syncImagesFromCatApi(breedId, limit);
      const updatedImages = await this.catImageRepository.findByBreedId(breedId);
      return CatImageMapper.toDtoArray(updatedImages.slice(0, limit));
    } catch (error: any) {
      return CatImageMapper.toDtoArray(localImages.slice(0, limit));
    }
  }

  async getImageById(imageId: string): Promise<CatImageDto> {
    const image = await this.catImageRepository.findByImageId(imageId);

    if (!image) {
      throw new ImageNotFoundError(imageId);
    }

    return CatImageMapper.toDto(image);
  }

  async getRandomImages(limit: number = 10): Promise<CatImageDto[]> {
    const images = await this.catImageRepository.findRandomImages(limit);

    if (images.length < limit) {
      try {
        await this.syncRandomImagesFromCatApi(limit);
        const updatedImages = await this.catImageRepository.findRandomImages(limit);
        return CatImageMapper.toDtoArray(updatedImages);
      } catch (error) {
        return CatImageMapper.toDtoArray(images);
      }
    }

    return CatImageMapper.toDtoArray(images);
  }

  private async syncImagesFromCatApi(breedId: string, limit: number): Promise<void> {
    try {

      const headers = catApiKey ? { 'x-api-key': catApiKey } : {};
      const params = {
        breed_ids: breedId,
        limit: limit,
        has_breeds: 1
      };

      const response = await axios.get(`${catApiUrl}/images/search`, {
        headers,
        params
      });

      const apiImages = response.data;

      for (const apiImage of apiImages) {
        const existingImage = await this.catImageRepository.findByImageId(apiImage.id);

        if (!existingImage) {
          const catImage = new CatImage({
            imageId: apiImage.id,
            url: apiImage.url,
            width: apiImage.width || 0,
            height: apiImage.height || 0,
            breeds: apiImage.breeds ? apiImage.breeds.map((b: any) => b.id) : [breedId],
            categories: apiImage.categories ? apiImage.categories.map((c: any) => c.name) : []
          });

          await this.catImageRepository.create(catImage);
        }
      }
    } catch (error: any) {
      throw new CatApiError(`Failed to sync images for breed ${breedId}: ${error.message}`);
    }
  }

  private async syncRandomImagesFromCatApi(limit: number): Promise<void> {
    try {
      const headers = catApiKey ? { 'x-api-key': catApiKey } : {};
      const params = {
        limit: limit,
        has_breeds: 1
      };

      const response = await axios.get(`${catApiUrl}/images/search`, {
        headers,
        params
      });

      const apiImages = response.data;

      for (const apiImage of apiImages) {
        const existingImage = await this.catImageRepository.findByImageId(apiImage.id);

        if (!existingImage) {
          const catImage = new CatImage({
            imageId: apiImage.id,
            url: apiImage.url,
            width: apiImage.width || 0,
            height: apiImage.height || 0,
            breeds: apiImage.breeds ? apiImage.breeds.map((b: any) => b.id) : [],
            categories: apiImage.categories ? apiImage.categories.map((c: any) => c.name) : []
          });

          await this.catImageRepository.create(catImage);
        }
      }
    } catch (error: any) {
      throw new CatApiError(`Failed to sync random images: ${error.message}`);
    }
  }
}