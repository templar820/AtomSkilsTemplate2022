import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
  constructor(response) {
    super(response, HttpStatus.BAD_REQUEST);
    this.message = Object.values(response[0].constraints)[0] as string;
  }
}
