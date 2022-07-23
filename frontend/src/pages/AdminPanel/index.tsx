import React from 'react';
import { MOBXDefaultProps } from '@globalTypes';
import MobXRouterDecorator from '@components/HOC/MobXRouterDecorator';

function AdminPanel(props: MOBXDefaultProps) {
  /**
   * TODO нужна прокся на admin
   */
  return (
    <iframe width={'100%'} height={'100%'} src={`http://localhost:8000/admin`}/>
  );
}
export default MobXRouterDecorator(AdminPanel);
