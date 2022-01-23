import { ISubstance } from './DbModel';

export interface IProduct {
  id: number;
  name: string;
  substance?: ISubstance;
  substanceId: string
}

export default class Product implements IProduct {
  constructor(obj: IProduct) {
    this.id = obj.id;
    this.name = obj.name;
    this.substance = obj.substance;
    this.substanceId = obj.substanceId;
  }

  id: number;

  name: string;

  substance?: ISubstance;

  substanceId: string;
}
