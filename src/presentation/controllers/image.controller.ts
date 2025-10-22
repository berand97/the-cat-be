import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'tsyringe';
import { CatImageService } from '@application/services/cat-image.service';
import { formatSuccessResponse } from '@presentation/utils';

@injectable()
export class ImageController {
  constructor(
    @inject(CatImageService) private catImageService: CatImageService
  ) {}

  getImagesByBreed = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { breed_id } = req.params;
      const images = await this.catImageService.getImagesByBreed(breed_id, req.query);
      const response = formatSuccessResponse(images, 200, undefined, images.length);
      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  getImageById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { image_id } = req.params;
      const image = await this.catImageService.getImageById(image_id);
      const response = formatSuccessResponse(image);
      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  getRandomImages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { limit = 10 } = req.query as any;
      const images = await this.catImageService.getRandomImages(limit);
      const response = formatSuccessResponse(images, 200, undefined, images.length);
      res.json(response);
    } catch (error) {
      next(error);
    }
  };
}