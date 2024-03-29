import jwt from 'jsonwebtoken';
import {
  Body, Controller, Get, Post, Route, Header, Tags, Security
} from 'tsoa';
import { ServerError } from '../middleware/errorHandler';
import UserService from '../services/UserService';
import CONSTANT from "../config/CONSTANT";

interface AuthCred {
 email: string;
 password: string
}

interface IUser extends IUserExport{
  password: string;
}

interface IUserExport {
  email: string;
  role?: 'ADMIN' | 'USER';
  language?: string;
}

@Route('/user')
@Tags('User')
class UserController extends Controller {
  @Post('/register')
  public async createUser(@Body() body: IUser): Promise<{ token: string }> {
    const { email, id } = await UserService.create(body);
    const token = jwt.sign({ email, id }, CONSTANT.SECRET_KEY);
    return { token };
  }

  /**
   * login для пользователя
   * @param body
   */
  @Post('/login')
  public async loginUser(@Body() body: AuthCred) : Promise<{ token: string }> {}

  @Get('/logout')
  public async logoutUser() : Promise<{}> {}

  @Get('/userInfo')
  async getUserByToken(@Header('token') token: string): Promise<IUserExport> {
    const user = await UserService.getOne(Number(token));
    if (!user) throw new ServerError(404, 'User not found');
    return user;
  }
}

export default new UserController();
