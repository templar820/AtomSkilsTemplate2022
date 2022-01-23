export default class MyError extends Error {
  statusCode: number | string;
  description: string;
  constructor({ status, detail } : {status?: number; detail: string;}) {
    super(detail);
    this.statusCode = status || 'Oops';
    this.message = detail;
    this.description = this.getDescription();
  }

  getDescription() {
    let description = '';
    switch (this.statusCode) {
    case 404:
      description = 'Сервер не найден';
      break;
    }
    return description;
  }
}
