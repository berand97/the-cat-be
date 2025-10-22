import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'tsyringe';
import { BreedService } from '@application/services/breed.service';
import { formatSuccessResponse } from '@presentation/utils';

@injectable()
export class BreedController {
  constructor(
    @inject(BreedService) private breedService: BreedService
  ) {}

  getBreeds = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const breeds = await this.breedService.getAllBreeds(req.query);
      const response = formatSuccessResponse(breeds, 200, undefined, breeds.length);
      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  getBreedById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { breed_id } = req.params;
      const breed = await this.breedService.getBreedById(breed_id);
      const response = formatSuccessResponse(breed);
      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  searchBreeds = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { q } = req.query;
      const breeds = await this.breedService.searchBreeds(q as string);
      const response = formatSuccessResponse(breeds, 200, undefined, breeds.length);
      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  syncBreeds = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.breedService.syncBreedsFromCatApi();
      const response = formatSuccessResponse(null, 200, 'Breeds synchronized successfully');
      res.json(response);
    } catch (error) {
      next(error);
    }
  };
}