export default class ProductModel {
  id: number;

  name: string;

  substance: {
    name: string;
    code: string;
    id: string
  } = {};

  constructor(obj: any) {
    this.id = obj.id;
    this.name = obj.name;
    this.substance.id = obj.substance?.id;
    this.substance.name = obj.substance?.name;
    this.substance.code = obj.substance?.code;
  }
}
