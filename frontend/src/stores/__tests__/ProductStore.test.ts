import ProductStore from "../ProductStore";

describe("ProductStore", () => {
  let store = new ProductStore();
  const product1 = {
    id: 1,
    name: 'product1',
    substance: {
      name: "substance1",
      code: 'substanceCode',
    }
  };
  const product2 = {
    id: 2,
    name: 'product2',
    substance: {
      name: "substance2",
      code: 'substanceCode',
    }
  };
  beforeEach(() => {
    store = new ProductStore();
  });

  it("add new products", () => {
    store.addProducts([product1]);
    store.addProducts([product2]);
    expect(store.products).not.toBeNull();
    expect(store.products?.length).toBe(2);
    store.products && expect(store.products[1].name).toBe('product2');
  });

  it("clear products", () => {
    store.addProducts([product1, product2]);
    store.clearProducts();
    expect(store.products).toBeNull();
  });

  it("set count", () => {
    store.setCount(5);
    expect(store.count).toBe(5);
  });
});