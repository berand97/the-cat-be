import { BreedRepository } from '../../src/infrastructure/repositories/breed.repository';

jest.mock('../../src/infrastructure/database/models', () => ({
  BreedModel: {
    find: jest.fn().mockReturnThis(),
    findOne: jest.fn().mockReturnThis(),
    findById: jest.fn().mockReturnThis(),
    create: jest.fn(),
    save: jest.fn(),
    limit: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    exec: jest.fn(),
    countDocuments: jest.fn()
  }
}));

describe('BreedRepository', () => {
  let breedRepository: BreedRepository;

  beforeEach(() => {
    breedRepository = new BreedRepository();
  });

  describe('initialization', () => {
    it('should create instance successfully', () => {
      expect(breedRepository).toBeInstanceOf(BreedRepository);
    });
  });

  describe('methods exist', () => {
    it('should have findAll method', () => {
      expect(typeof breedRepository.findAll).toBe('function');
    });

    it('should have findById method', () => {
      expect(typeof breedRepository.findById).toBe('function');
    });

    it('should have create method', () => {
      expect(typeof breedRepository.create).toBe('function');
    });
  });
});