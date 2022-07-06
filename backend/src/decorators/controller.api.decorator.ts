import { applyDecorators, Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

export function ControllerAPI(prefix: string) {
  return applyDecorators(
    Controller(prefix),
    ApiTags(prefix),
    ApiBearerAuth('access-token'),
  );
}
