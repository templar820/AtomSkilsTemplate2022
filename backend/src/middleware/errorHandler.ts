import { ERRORS } from '../config/errors';

export class ServerError{
  status: number;

  message: string;

  constructor(code: number) {
    const error = ERRORS[code] || ERRORS[0];
    this.status = error.status;
    this.message = error.message;
  }
}

export const errorHandler = (err: { status: any; message: any; }, req: any, res: any, next: any) => {
    res.status(err.status);
    res.send({
      message: err.message,
      isError: true,
      data: [],
      status: err.status
    });
};
