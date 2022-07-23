import {Roles} from "@services/Auth.service";
import {Home, Settings} from "@mui/icons-material";

export default {
  [Roles.ADMIN]: [{
      id: 'home',
      name: 'Главная',
      path: '/home',
      icon: <Home />
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
      ]
    },
  ],
  [Roles.USER]: [{
    id: 'home',
    name: 'Главная',
    path: '/home',
    icon: <Home />
  }]
}