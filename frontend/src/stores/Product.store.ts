import {
  action, makeAutoObservable, observable, toJS
} from 'mobx';
import ProductModel from '../model/Product.model';
import UTILS from '../utils';

const data = [
  {
    id: 462428,
    name: 'Аккупро таблетки покрыт.плен.об. 10 мг, 30 шт.',
    createdAt: '2022-07-11T20:53:17.208Z',
    updatedAt: '2022-07-11T20:53:17.208Z',
    substanceId: 1,
    substance: {
      id: 1,
      name: 'Хинаприл',
      code: 'khinapril'
    }
  },
  {
    id: 462429,
    name: 'Аккупро таблетки покрыт.плен.об. 20 мг, 30 шт.',
    createdAt: '2022-07-11T20:53:17.208Z',
    updatedAt: '2022-07-11T20:53:17.208Z',
    substanceId: 1,
    substance: {
      id: 1,
      name: 'Хинаприл',
      code: 'khinapril'
    }
  },
  {
    id: 474228,
    name: 'Аккупро таблетки покрыт.плен.об. 40 мг, 30 шт.',
    createdAt: '2022-07-11T20:53:17.208Z',
    updatedAt: '2022-07-11T20:53:17.208Z',
    substanceId: 1,
    substance: {
      id: 1,
      name: 'Хинаприл',
      code: 'khinapril'
    }
  },
  {
    id: 473557,
    name: 'Камфорный спирт, флаконы 10% , 40 мл',
    createdAt: '2022-07-11T20:53:17.222Z',
    updatedAt: '2022-07-11T20:53:17.222Z',
    substanceId: 2,
    substance: {
      id: 2,
      name: 'Камфора',
      code: 'kamfora'
    }
  },
  {
    id: 473558,
    name: 'Камфорное масло, флаконы 10% , 30 мл',
    createdAt: '2022-07-11T20:53:17.223Z',
    updatedAt: '2022-07-11T20:53:17.223Z',
    substanceId: 2,
    substance: {
      id: 2,
      name: 'Камфора',
      code: 'kamfora'
    }
  },
  {
    id: 931433,
    name: 'Камфорный спирт 2%, флаконы 2% , 40 мл',
    createdAt: '2022-07-11T20:53:17.223Z',
    updatedAt: '2022-07-11T20:53:17.223Z',
    substanceId: 2,
    substance: {
      id: 2,
      name: 'Камфора',
      code: 'kamfora'
    }
  },
  {
    id: 483284,
    name: 'Камфорное масло 10% фл, 30 мл',
    createdAt: '2022-07-11T20:53:17.223Z',
    updatedAt: '2022-07-11T20:53:17.223Z',
    substanceId: 2,
    substance: {
      id: 2,
      name: 'Камфора',
      code: 'kamfora'
    }
  },
  {
    id: 1278432,
    name: 'Камфорный спирт флаконы 10%, 40 мл',
    createdAt: '2022-07-11T20:53:17.223Z',
    updatedAt: '2022-07-11T20:53:17.223Z',
    substanceId: 2,
    substance: {
      id: 2,
      name: 'Камфора',
      code: 'kamfora'
    }
  },
  {
    id: 494731,
    name: 'Камфорный спирт, флаконы 2% , 40 мл',
    createdAt: '2022-07-11T20:53:17.223Z',
    updatedAt: '2022-07-11T20:53:17.223Z',
    substanceId: 2,
    substance: {
      id: 2,
      name: 'Камфора',
      code: 'kamfora'
    }
  },
  {
    id: 540888,
    name: 'Камфорный спирт, флаконы 10% , 40 мл',
    createdAt: '2022-07-11T20:53:17.224Z',
    updatedAt: '2022-07-11T20:53:17.224Z',
    substanceId: 2,
    substance: {
      id: 2,
      name: 'Камфора',
      code: 'kamfora'
    }
  },
  {
    id: 604890,
    name: 'Камфорная, мазь 10%  25 г',
    createdAt: '2022-07-11T20:53:17.224Z',
    updatedAt: '2022-07-11T20:53:17.224Z',
    substanceId: 2,
    substance: {
      id: 2,
      name: 'Камфора',
      code: 'kamfora'
    }
  },
  {
    id: 975095,
    name: 'All Inclusive Delicate Peeling Пилинг гликолевый, 50 мл',
    createdAt: '2022-07-11T20:53:17.261Z',
    updatedAt: '2022-07-11T20:53:17.261Z',
    substanceId: 3,
    substance: {
      id: 3,
      name: 'Сушеницы топяной трава',
      code: 'sushenitsy_topyanoy_trava'
    }
  },
  {
    id: 494623,
    name: 'Оксипрогестерон, раствор оливковом масле 12.5% , 1 мл , 10 шт.',
    createdAt: '2022-07-11T20:53:17.293Z',
    updatedAt: '2022-07-11T20:53:17.293Z',
    substanceId: 4,
    substance: {
      id: 4,
      name: 'Гидроксипрогестерона капроат',
      code: 'gidroksiprogesterona_kaproat'
    }
  },
  {
    id: 462648,
    name: 'Фуцидин Г, крем, 15 г',
    createdAt: '2022-07-11T20:53:17.312Z',
    updatedAt: '2022-07-11T20:53:17.312Z',
    substanceId: 5,
    substance: {
      id: 5,
      name: 'Гидрокортизон, Фузидовая кислота',
      code: 'gidrokortizon_fuzidovaya_kislota'
    }
  },
  {
    id: 785147,
    name: 'Синафлан мазь, 0.025% 15 г',
    createdAt: '2022-07-11T20:53:17.334Z',
    updatedAt: '2022-07-11T20:53:17.334Z',
    substanceId: 6,
    substance: {
      id: 6,
      name: 'Флуоцинолона ацетонид',
      code: 'fluotsinolona_atsetonid'
    }
  },
  {
    id: 494422,
    name: 'Флуцинар, мазь 0.025% , 15 г',
    createdAt: '2022-07-11T20:53:17.335Z',
    updatedAt: '2022-07-11T20:53:17.335Z',
    substanceId: 6,
    substance: {
      id: 6,
      name: 'Флуоцинолона ацетонид',
      code: 'fluotsinolona_atsetonid'
    }
  },
  {
    id: 494427,
    name: 'Флуцинар, гель 0.025% , 15 г',
    createdAt: '2022-07-11T20:53:17.335Z',
    updatedAt: '2022-07-11T20:53:17.335Z',
    substanceId: 6,
    substance: {
      id: 6,
      name: 'Флуоцинолона ацетонид',
      code: 'fluotsinolona_atsetonid'
    }
  },
  {
    id: 500402,
    name: 'Синафлан, мазь 0.025% , 10 г',
    createdAt: '2022-07-11T20:53:17.335Z',
    updatedAt: '2022-07-11T20:53:17.335Z',
    substanceId: 6,
    substance: {
      id: 6,
      name: 'Флуоцинолона ацетонид',
      code: 'fluotsinolona_atsetonid'
    }
  },
  {
    id: 494804,
    name: 'Синафлан, мазь 0.025% , 15 г',
    createdAt: '2022-07-11T20:53:17.335Z',
    updatedAt: '2022-07-11T20:53:17.335Z',
    substanceId: 6,
    substance: {
      id: 6,
      name: 'Флуоцинолона ацетонид',
      code: 'fluotsinolona_atsetonid'
    }
  },
  {
    id: 480239,
    name: 'Гриппферон с лоратадином мазь назальная, 10 тыс.ме+2 мг/г 5 г',
    createdAt: '2022-07-11T20:53:17.364Z',
    updatedAt: '2022-07-11T20:53:17.364Z',
    substanceId: 7,
    substance: {
      id: 7,
      name: 'Интерферон альфа-2b, Лоратадин',
      code: 'interferon_alfa_2b_loratadin'
    }
  }
];

export default class ProductStore {
  get productList(): ProductModel[] {
    const criteria = this.filterNames.find(el => el.active);
    return UTILS.getSortableList(toJS(this._productList), criteria, `${criteria?.value}`);
  }

  set productList(value) {
    this._productList = value;
  }

  @observable _productList = [];

  constructor() {
    makeAutoObservable(this);
    this.setProductList(data);
  }

  @action
  setProductList(list) {
    this.productList = list.map(el => new ProductModel(el));
  }

  filterNames = [
    {
      ascending: 'top',
      active: false,
      name: 'по названию',
      value: 'name'
    },
    {
      ascending: 'top',
      active: false,
      name: 'по количеству чатов',
      value: 'chats.length'
    }
  ];

  @action
  setFilterNames(list) {
    this.filterNames = list;
  }
}
