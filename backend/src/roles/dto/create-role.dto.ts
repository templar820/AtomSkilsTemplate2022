import { ApiProperty } from '@nestjs/swagger';

export default class CreateRoleDto {
  @ApiProperty({ example: 'USER' })
  readonly value: string;

  @ApiProperty()
  readonly description: string;
}
