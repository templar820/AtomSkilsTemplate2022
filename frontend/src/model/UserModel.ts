export default class UserModel {
  email: string;
  role: string;
  language: string;
  
  constructor(obj: any) {
    this.email = obj.email;
    this.role = obj.role;
    this.language = obj.language;
  }
}