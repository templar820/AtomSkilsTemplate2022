import { ERRORS } from '../config/errors';

export class ServerError{
  status: number;

  message: string;

  constructor(code: number, message?: string) {
      if (message) {
          this.message = message;
          this.status = code;
      } else {
          const error = ERRORS[code] || ERRORS[0];
          this.message = message || error.message;
          this.status = error.status;
      }
  }
}

export const errorHandler = (err: { status: any; message: any; }, req: any, res: any, next: any) => {
    res.status(err.status || 500);
    res.send({
      message: err.message || 'Системная ошибка',
      isError: true,
      data: [],
      status: err.status || 500
    });
};
