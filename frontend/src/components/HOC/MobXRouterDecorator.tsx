import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { StoresNames } from '@globalTypes';

export default function (component, router = true) {
  if (!router) return inject('services', ...Object.values(StoresNames))(observer(component));
  return withRouter(inject('services', ...Object.values(StoresNames))(observer(component)));
}
