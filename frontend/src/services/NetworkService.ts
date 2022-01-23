import MyError from '@/services/MyError';

type postType = 'GET' | 'POST' | 'DELETE' | 'PATCH';

export default class NetworkService {
  token: string | null = null;

  endpoint: string;
  
  private readonly address: string;

  constructor(endpoint: string) {
    this.endpoint = `${endpoint}api/`;
    this.address = endpoint;
  }

  setToken(token: string | null) {
    // Т.Е. пользователь авторизовался TODO вынести отсюда контролировать в UserStore

    this.token = token;
  }

  async checkResponse(res: Response, errorHandler?: (err: MyError) => void) {
    if (res.status === 500) {
      throw new MyError({ detail: 'Внутренняя ошибка сервера' });
    } else if (res.status === 200) {
      const response = await res.json();
      if (response.isError) {
        const error = new MyError({ status: response.statusCode, detail: response.message });
        if (errorHandler) {
          errorHandler(error);
        } else {
          throw error;
        }
      }
      return response;
    }
    return res;
  }

  fetch = ({
    alias, parameters, type = 'POST', errorHandler
  }: {alias: string; parameters?: object; type?: postType, errorHandler?: (err: MyError) => void}) => {
    const options : {method: string, headers: any, body: null | string} = {
      method: type,
      headers: this.buildHeaders(),
      body: null,
    };

    if (parameters) options.body = JSON.stringify(parameters);

    return fetch(`${this.endpoint}${alias}`, options)
      .then(response => this.checkResponse(response, errorHandler));
  }

  buildHeaders = () => ({
    'Content-Type': 'application/json',
    ...(this.token ? { token: `${this.token}` } : {})
  })
}
