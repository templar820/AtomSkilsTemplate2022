import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { MyResponse } from '../interceptors/response.interceptor';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const body: MyResponse<any> = {
      message: exception.message,
      statusCode: status,
      data: null,
      isError: true,
    };

    response.json(body);
  }
}
