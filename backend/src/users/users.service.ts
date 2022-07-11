import { Injectable } from '@nestjs/common';
import { User } from './user.model';
import { InjectConnection, InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { Role } from '../roles/roles.model';
import { Sequelize } from 'sequelize';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
    @InjectConnection() private db: Sequelize,
  ) {}

  async createUser(dto: CreateUserDto) {
    try {
      const t = await this.db.transaction();
      const hashPassword = await this.getPassword(dto.password);
      const user = await this.userRepository.create(
        { ...dto, password: hashPassword },
        { transaction: t },
      );
      await t.commit();
      return user;
    } catch (e) {
      console.log(e);
    }
  }

  getPassword = async (password) => await bcrypt.hash(password, 5);

  checkPassword = async (password, passwordHash) =>
    await bcrypt.compare(password, passwordHash);

  async getAllUsers() {
    return await this.userRepository.findAll({ include: { model: Role } });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      include: { model: Role },
    });
  }
}
