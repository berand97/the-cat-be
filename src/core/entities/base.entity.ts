export interface IEntity {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export abstract class BaseEntity implements IEntity {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data?: Partial<BaseEntity>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}