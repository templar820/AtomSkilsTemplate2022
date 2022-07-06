import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(body: User) {
    const user = await this.validateUser(body.email, body.password);
    const payload = {
      email: user.email,
      id: user.id,
      roles: user.roles.map((el) => el.value),
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  registration(userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user: User = await this.userService.findByEmail(email);

    if (user && user.password === pass) {
      return user;
    }

    return null;
  }
}
