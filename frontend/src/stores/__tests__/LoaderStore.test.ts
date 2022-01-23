import LoaderStore from "@/stores/LoaderStore";

describe("LoaderStore", () => {
  test("set loader", () => {
    const store = new LoaderStore();
    store.setLoader(true);
    expect(store.isLoader).toBe(true);
    store.setLoader(false);
    expect(store.isLoader).toBe(false);
  });
})