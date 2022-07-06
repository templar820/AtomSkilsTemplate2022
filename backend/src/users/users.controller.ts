import { Body, Get, Post, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './user.model';
import { ControllerAPI } from '../decorators/controller.api.decorator';
import { HandleAPI } from '../decorators/handle.api.decorator';

@ControllerAPI('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Post('')
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @HandleAPI([User], 'получи всех пользователей, только для АДМИНОВ', 'ADMIN')
  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @Get('/error')
  getError() {
    throw new UnauthorizedException({ message: 'Не авторизован' });
  }
}