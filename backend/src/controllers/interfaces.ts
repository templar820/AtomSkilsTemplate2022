export interface ASController<T> {
  getOne(id: number): Promise<T>;
  getAll(body: T): Promise<T[]>;
  create(body: T): Promise<T>;
  update(body: T): Promise<T>;
  delete(id: number): Promise<T>;
}
