export class ServerError extends Error {
  status: number;

  message: string;

  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }
}

export const errorHandler = (err: { status: any; message: any; }, req: any, res: { sendFormat: (arg0: null, arg1: number, arg2: string, arg3: boolean) => any; }) => {
  // console.log('Error:', err);
  if (err instanceof ServerError) {
    return res.sendFormat(null, err.status, err.message, true);
  }
  if (err instanceof Error) {
    return res.sendFormat(null, 500, err.message, true);
  }
  return res.sendFormat(null, 500, 'Server Error', true);
};
