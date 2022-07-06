import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RolesGuard } from '../guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';

export const ROLES_KEY = 'roles';

export function HandleAPI(model, description: string, ...roles: string[]) {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    ApiUnauthorizedResponse({ description: 'Не авторизован' }),
    UseGuards(AuthGuard('jwt'), RolesGuard),
    ApiOperation({ summary: description }),
    ApiResponse({ status: 200, type: model }),
  );
}
