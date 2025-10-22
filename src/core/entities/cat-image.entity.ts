import { BaseEntity } from './base.entity';

export class CatImage extends BaseEntity {
  imageId: string;
  url: string;
  width: number;
  height: number;
  breeds: string[];
  categories?: string[];

  constructor(data?: Partial<CatImage>) {
    super(data);
    this.imageId = data?.imageId || '';
    this.url = data?.url || '';
    this.width = data?.width || 0;
    this.height = data?.height || 0;
    this.breeds = data?.breeds || [];
    this.categories = data?.categories;
  }
}