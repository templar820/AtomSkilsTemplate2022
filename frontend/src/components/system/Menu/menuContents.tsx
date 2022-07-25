import {Roles} from "@services/Auth.service";
import {Home, Settings, Person} from "@mui/icons-material";

const handler = {
  get: function(target, name){
    return name in target?
      target[name] : target[Roles.ADMIN];
  }
};

export default new Proxy({
  [Roles.ADMIN]: [{
    id: 'home',
    name: 'Главная',
    path: '/home',
    icon: <Home />
  },
    {
      id: 'admin',
      name: 'Администрирование',
      path: '/admin-panel',
      icon: <Person />
    },
    {
      id: 'examples',
      name: 'Примеры',
      icon: <Settings />,
      children: [
        {
          id: 'table',
          name: 'Таблицы',
          path: '/examples/table'
        },
        {
          id: 'products',
          name: 'Сущности в списке',
          path: '/examples/products'
        },
        {
          id: 'pdf',
          name: 'Pdf',
          path: '/examples/pdf'
        },
        {
          id: 'analytics',
          name: 'Аналитика',
          path: '/examples/analytics'
        },
      ]
    },
  ],
  [Roles.USER]: [{
    id: 'home',
    name: 'Главная',
    path: '/home',
    icon: <Home />
  }]
}, handler);
