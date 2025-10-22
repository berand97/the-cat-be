export interface IRepository<T> {
  findAll(options?: FindOptions): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  create(entity: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;
  update(id: string, entity: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
  count(filter?: Partial<T>): Promise<number>;
}

export interface FindOptions {
  limit?: number;
  offset?: number;
  sort?: Record<string, 1 | -1>;
  filter?: Record<string, any>;
}