import NetworkService from "@/services/NetworkService";
import UserStore from "@/stores/UserStore";
import LoaderStore from "@/stores/LoaderStore";
import SocketService from "@/services/SocketService";

export default class AuthService {
  private networkService: NetworkService;
  private userStore: UserStore;
  private loaderStore: LoaderStore;
  private socketService: SocketService;

  constructor(networkService: NetworkService, userStore: UserStore, loaderStore: LoaderStore, socketService: SocketService) {
    this.networkService = networkService;
    this.userStore = userStore;
    this.loaderStore = loaderStore;
    this.socketService = socketService;
  }

  async login(email: string, password: string) {
    this.loaderStore.setLoader(true);
    const {data} = await this.networkService.fetch({alias: 'user/login', parameters: {email, password}});
    const {token} = data;
    this.networkService.setToken(token);
    localStorage.setItem('token', token);
    this.loaderStore.setLoader(false);
  }

  async register(email: string, password: string) {
    this.loaderStore.setLoader(true);
    const {data} = await this.networkService.fetch({alias: 'user/register', parameters: {email, password}});
    const {token} = data;
    this.networkService.setToken(token);
    localStorage.setItem('token', token);
    this.loaderStore.setLoader(false);
  }

  async authentication() {
    this.loaderStore.setLoader(true);
    const {data} = await this.networkService.fetch({alias: 'user/userInfo', type: 'GET', errorHandler: err => {
        this.userStore.setUser({}, false);
        localStorage.removeItem('token');
      }
    });
    if (data) {
      this.userStore.setUser(data, true);
      this.socketService.register(localStorage.getItem('token'));
    } else {
      this.userStore.setUser({}, false);
      localStorage.removeItem('token');
    }
    this.loaderStore.setLoader(false);
  }


  async logout() {
    this.loaderStore.setLoader(true);
    await this.networkService.fetch({alias: 'user/logout', type: 'GET'});
    this.userStore.setUser({}, false);
    localStorage.removeItem('token');
    this.loaderStore.setLoader(false);
    this.socketService.disconnect();
  }
}