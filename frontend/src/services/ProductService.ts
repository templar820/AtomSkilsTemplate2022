import NetworkService from "@/services/NetworkService";
import ProductStore from "@/stores/ProductStore";
import LoaderStore from "@/stores/LoaderStore";

const limit = 48;

export default class ProductService {
  private networkService: NetworkService;
  private productStore: ProductStore;
  constructor(networkService: NetworkService, productStore: ProductStore, loaderStore: LoaderStore) {
    this.networkService = networkService;
    this.productStore = productStore;
  }

  async getProducts() {
    const {data} = await this.networkService.fetch({alias: 'products/part', parameters: {offset: 0, limit}});
    this.productStore.setMode('all');
    this.productStore.clearProducts();
    this.productStore.addProducts(data.products);
    this.productStore.setCount(data.count);
  }

  async deleteProduct(id: number) {
    await this.networkService.fetch({alias: `products/${id}`, type: 'DELETE'});
    this.productStore.deleteProduct(id);
  }

  async createProduct(productName: string, substanceId: number) {
    if (Number.isNaN(substanceId)) throw Error('Неверный id');
    const {data} = await this.networkService.fetch({alias: 'products', parameters: {name: productName, substanceId}});
    this.productStore.unshiftProduct(data);
  }

  async updateProduct(id: number, productName: string, substanceId: number) {
    if (Number.isNaN(substanceId)) throw Error('Неверный id');
    const {data} = await this.networkService.fetch({alias: 'products', parameters: {id, name: productName, substanceId}, type: 'PATCH'});
    this.productStore.updateProduct(data);
  }

  async searchProduct(product: string) {
    const {data} = await this.networkService.fetch({alias: 'products/search', parameters: {offset: 0, limit, query: product}});
    this.productStore.setMode('search', product);
    this.productStore.clearProducts();
    this.productStore.addProducts(data.products);
    this.productStore.setCount(data.count);
  }

  async loadProduct() {
    const offset = this.productStore.products?.length || 0;
    if (this.productStore.mode.value === 'all') {
      const {data} = await this.networkService.fetch({alias: 'products/part', parameters: {offset, limit}});
      this.productStore.addProducts(data.products);
      this.productStore.setCount(data.count);
    }

    if (this.productStore.mode.value === 'search') {
      const {data} = await this.networkService.fetch({alias: 'products/search', parameters: {offset: 0, limit, query: this.productStore.mode.searchProduct}});
      this.productStore.addProducts(data.products);
      this.productStore.setCount(data.count);
    }
  }
}
