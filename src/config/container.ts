import 'reflect-metadata';
import { container } from 'tsyringe';

import { IBreedRepository } from '@core/repositories/breed.repository.interface.js';
import { ICatImageRepository } from '@core/repositories/cat-image.repository.interface.js';
import { IUserRepository } from '@core/repositories/user.repository.interface.js';

import { BreedRepository } from '@infrastructure/repositories/breed.repository.js';
import { CatImageRepository } from '@infrastructure/repositories/cat-image.repository.js';
import { UserRepository } from '@infrastructure/repositories/user.repository.js';

import { AuthService } from '@application/services/auth.service.js';
import { BreedService } from '@application/services/breed.service.js';
import { CatImageService } from '@application/services/cat-image.service.js';

import { AuthController } from '@presentation/controllers/auth.controller.js';
import { BreedController } from '@presentation/controllers/breed.controller.js';
import { ImageController } from '@presentation/controllers/image.controller.js';

export const configureDependencyInjection = (): void => {
  container.registerSingleton<IBreedRepository>('IBreedRepository', BreedRepository);
  container.registerSingleton<IUserRepository>('IUserRepository', UserRepository);
  container.registerSingleton<ICatImageRepository>('ICatImageRepository', CatImageRepository);

  container.registerSingleton(BreedService);
  container.registerSingleton(AuthService);
  container.registerSingleton(CatImageService);

  container.registerSingleton(BreedController);
  container.registerSingleton(AuthController);
  container.registerSingleton(ImageController);
};