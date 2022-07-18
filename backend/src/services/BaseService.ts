export default class BaseService {
  model;

  constructor(model) {
    this.model = model;
  }

  async create(model) {
    return await this.model.create(model);
  }

  async getAll() {
    return await this.model.findAll();
  }

  async getOne(id: number) {
    return await this.model.findOne({ where: { id } });
  }

  async update(model) {
    return await this.model.update(model, { where: { id: model.id } });
  }

  async delete(id: number) {
    return await this.model.delete({ where: { id } });
  }

  flatKeysForObject(obj: any[], alias: string){
    const element = {} as any;
    console.log(obj);
    for (const [key, value] of Object.entries(obj)){
      element[key.replace(`${alias}.`, "")] = value;
    }
    return element
  }

  flatKeysForArray(obj: any[], alias: string){
    const element = {} as any;
    console.log(obj);
    for (const [key, value] of Object.entries(obj)){
      element[key.replace(`${alias}.`, "")] = value;
    }
    return element
  }
}
