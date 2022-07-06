import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'id',
    });
  }

  async validate(login: string, password: string): Promise<any> {
    const admin = await this.authService.validateUser(login, password);

    if (!admin) {
      console.log(true);
      throw new UnauthorizedException();
    }
    return admin;
  }
}
