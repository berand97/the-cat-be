import { Model, Document } from 'mongoose';
import { IRepository, FindOptions } from '@core/repositories/base.repository.interface';

export abstract class BaseRepository<T, TDocument extends Document> implements IRepository<T> {
  constructor(protected model: Model<TDocument>) {}

  async findAll(options?: FindOptions): Promise<T[]> {
    const query = this.model.find(options?.filter || {});
    
    if (options?.sort) {
      query.sort(options.sort);
    }
    
    if (options?.offset) {
      query.skip(options.offset);
    }
    
    if (options?.limit) {
      query.limit(options.limit);
    }

    const documents = await query.exec();
    return documents.map(doc => this.mapToEntity(doc));
  }

  async findById(id: string): Promise<T | null> {
    const document = await this.model.findById(id).exec();
    return document ? this.mapToEntity(document) : null;
  }

  async create(entity: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T> {
    const document = new this.model(entity);
    const savedDocument = await document.save();
    return this.mapToEntity(savedDocument);
  }

  async update(id: string, entity: Partial<T>): Promise<T | null> {
    const document = await this.model
      .findByIdAndUpdate(id, entity as any, { new: true, runValidators: true })
      .exec();
    return document ? this.mapToEntity(document as TDocument) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return !!result;
  }

  async count(filter?: Partial<T>): Promise<number> {
    return this.model.countDocuments((filter || {}) as any).exec();
  }

  protected abstract mapToEntity(document: TDocument): T;
}