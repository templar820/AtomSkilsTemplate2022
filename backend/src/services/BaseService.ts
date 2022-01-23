export default class BaseService {
  flatKeysForArray(obj: any[], alias: string){
    const element = {} as any;
    console.log(obj);
    for (const [key, value] of Object.entries(obj)){
      element[key.replace(`${alias}.`, "")] = value;
    }
    return element
  }
  
  flatKeysForObject(obj: any[], alias: string){
    const element = {} as any;
    console.log(obj);
    for (const [key, value] of Object.entries(obj)){
      element[key.replace(`${alias}.`, "")] = value;
    }
    return element
  }
}