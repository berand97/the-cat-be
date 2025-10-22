import { Router } from 'express';
import { container } from 'tsyringe';
import { BreedController } from '@presentation/controllers/breed.controller';
import { authMiddleware, validateQuery } from '../middlewares';
import { SearchBreedsDto, SearchQueryDto } from '@application/dtos';

const router = Router();

const getController = () => {
  return container.resolve(BreedController);
};

router.get('/', 
  validateQuery(SearchBreedsDto),
  (req, res, next) => getController().getBreeds(req, res, next)
);

router.get('/search', 
  validateQuery(SearchQueryDto),
  (req, res, next) => getController().searchBreeds(req, res, next)
);

router.post('/sync', 
  authMiddleware, 
  (req, res, next) => getController().syncBreeds(req, res, next)
);

router.get('/:breed_id', 
  (req, res, next) => getController().getBreedById(req, res, next)
);

export default router;