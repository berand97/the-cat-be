import { Router } from 'express';
import { container } from 'tsyringe';
import { ImageController } from '@presentation/controllers/image.controller';
import { validateQuery } from '../middlewares';
import { GetImagesDto, RandomImagesQueryDto } from '@application/dtos';

const router = Router();

const getController = () => {
  return container.resolve(ImageController);
};

router.get('/breed/:breed_id', 
  validateQuery(GetImagesDto),
  (req, res, next) => getController().getImagesByBreed(req, res, next)
);

router.get('/random', 
  validateQuery(RandomImagesQueryDto),
  (req, res, next) => getController().getRandomImages(req, res, next)
);

router.get('/:image_id', 
  (req, res, next) => getController().getImageById(req, res, next)
);

export default router;