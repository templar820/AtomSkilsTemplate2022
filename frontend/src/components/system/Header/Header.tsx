import React, { useEffect, useState } from 'react';
import MobXRouterDecorator from '@components/HOC/MobXRouterDecorator';
import { MOBXDefaultProps } from '@globalTypes';
import './styles.scss';

function Header(props: MOBXDefaultProps) {
  return (
    <header className="px-2 header">
      <div className="d-flex justify-content-between align-items-center align-content-center my-2">
      </div>
    </header>
  );
}

export default MobXRouterDecorator(Header);
