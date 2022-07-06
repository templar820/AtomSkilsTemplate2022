import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/handle.api.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles.length) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException({
        message: 'Пользователь не авторизован',
      });
    }

    const user = this.jwtService.verify(token);
    req.user = user;
    const havRole = user.roles.some((role) => requiredRoles.includes(role));
    if (havRole) {
      return true;
    }
    throw new ForbiddenException({
      message: 'Нет прав на операцию',
    });
  }
}
