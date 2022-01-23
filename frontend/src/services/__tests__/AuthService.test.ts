import AuthService from "@/services/AuthService";
import NetworkService from "@/services/NetworkService";
import UserStore from "@/stores/UserStore";
import LoaderStore from "@/stores/LoaderStore";

describe("AuthService", () => {
  let service = new AuthService(new NetworkService(''), new UserStore(), new LoaderStore());
  beforeEach(() => {
    let service = new AuthService(new NetworkService(''), new UserStore(), new LoaderStore());
  });

  it("dd", () => {

    expect(1).toBe(1);
  });
});