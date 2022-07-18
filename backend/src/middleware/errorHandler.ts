import { ERRORS } from '../config/errors';

export class ServerError extends Error {
  status: number;

  message: string;

  constructor(code: number) {
    super();
    const error = ERRORS[code] || ERRORS[0];
    this.status = error.status;
    this.message = error.message;
  }
}

export const errorHandler = (err: { status: any; message: any; }, req: any, res: any) => {
  if (err instanceof ServerError) {
    res.status(err.status);
    return res.send({
      message: err.message
    });
  } else {
    console.log(err)
    res.status(500);
    res.render('error', { error: err });
  }
};
