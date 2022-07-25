import React from 'react';
import { MOBXDefaultProps } from '@globalTypes';
import MobXRouterDecorator from '@components/HOC/MobXRouterDecorator';

function AdminPanel(props: MOBXDefaultProps) {
  /**
   * TODO нужна прокся на admin
   */
  const endpoint = process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_ADMIN_ENDPOINT_DEVELOP : process.env.REACT_APP_ADMIN_ENDPOINT_PRODUCTION;
  console.log("ADMIN_ENDPOINT", endpoint);
  return (
    <iframe width={'100%'} height={'100%'} src={endpoint}/>
  );
}
export default MobXRouterDecorator(AdminPanel);
