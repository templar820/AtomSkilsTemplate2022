import { Inject, Injectable, UseInterceptors } from '@nestjs/common';
import { User } from './user.model';
import {
  InjectConnection,
  InjectModel,
  SequelizeModule,
} from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from '../roles/roles.service';
import { Role } from '../roles/roles.model';
import { Sequelize, Transaction } from 'sequelize';
import { TransactionInterceptor } from '../interceptors/transaction.interceptor';
import { TransactionParam } from '../decorators/transaction.decorator';
import CONSTANT from '../config/CONSTANT';

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
      const user = await this.userRepository.create(dto, { transaction: t });
      await this.userRepository.create(
        { email: dto.email + '1', password: dto.password },
        { transaction: t },
      );
      await t.commit();
      return user;
    } catch (e) {}
  }

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
