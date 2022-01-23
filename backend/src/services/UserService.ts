import {User, UserDetails} from "../models/DbModel";
import bcrypt from 'bcrypt';
import db from "../config/db";
import BaseService from "./BaseService";
import {ServerError} from "../middleware/errorHandler";

class UserService extends BaseService{
  async create({email, password, language = "RU", role = 'USER'}) {
    const hashPassword = await this.getPassword(password)
    return await User.create({email, password: hashPassword, role, user_details: {language}}, {
      include: {
        model: UserDetails,
        as: UserDetails.name
      }
    });
  }

  async loginUser(user){
    const dbUser = await User.findOne({ where: { email: user.email }});
    if (!dbUser) return null;

    return await this.checkPassword(user.password, dbUser.password) ? dbUser : null;
  }

  getPassword = async (password) => await bcrypt.hash(password, 5)

  checkPassword = async (password, passwordHash) => await bcrypt.compare(password, passwordHash)

  async getAll(){
    return await User.findAll({
      attributes: [
          'email',
          'role',
        [db.col('user_details.language'), 'language'],
      ],
      include: [{
        model: UserDetails,
        as: UserDetails.name,
        attributes: [],
        required: true,
      }],})
  }

  async getOne(id: number){
    const user = await User.findOne({
      where: {id},
      attributes: [
          'email',
          'role',
      ],
      include: [{
        model: UserDetails,
        as: UserDetails.name,
        attributes: ['language'],
        required: true,
      }],
      raw: true,
    })
    if (user) return this.flatKeysForObject(user, UserDetails.name);
    throw new ServerError(401, "Неавторизованный пользователь")
  }
}

export default new UserService()
