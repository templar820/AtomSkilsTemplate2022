import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.model';
import { UserRoles } from './user-roles.model';

@Table({ tableName: 'roles' })
export class Role extends Model<Role> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'ADMIN',
    description: 'Уникальный Значение роли',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  value: string;

  @ApiProperty({ example: 'Администратор', description: 'Пароль' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
