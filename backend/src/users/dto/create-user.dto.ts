import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'test@mail.ru', description: 'Почтовый адрес' })
  email: string;

  @ApiProperty({ example: 123132, description: 'Пароль' })
  password: string;
}
