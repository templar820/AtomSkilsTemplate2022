import React from 'react';
import { MOBXDefaultProps } from '@globalTypes';
import MobXRouterDecorator from '@components/HOC/MobXRouterDecorator';

function AdminPanel(props: MOBXDefaultProps) {

  return (
    <iframe src={'/admin'}/>
  );
}
export default MobXRouterDecorator(AdminPanel);
