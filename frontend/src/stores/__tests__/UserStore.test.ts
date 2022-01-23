import UserStore from "@/stores/UserStore";

describe("UserStore", () => {

  it("set user", () => {
    const store = new UserStore();
    const user = {
      email: 'email',
      role: 'admin',
      language: 'ru',
    };
    store.setUser(user, true);
    expect(store.user?.email).toBe('email');
    expect(store.isLogin).toBe(true);
  });
})