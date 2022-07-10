import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface MyResponse<T> {
  isError: boolean;
  statusCode: number;
  message: string;
  data: T;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, MyResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<MyResponse<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          statusCode: context.switchToHttp().getResponse().statusCode,
          isError: !!data.message,
          message: data.message || null,
          data: data,
        };
      }),
    );
  }
}
