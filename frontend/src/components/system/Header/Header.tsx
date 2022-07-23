import React, {useEffect, useRef, useState} from 'react';
import MobXRouterDecorator from '@components/HOC/MobXRouterDecorator';
import { MOBXDefaultProps } from '@globalTypes';
import './styles.scss';
import AccountMenu from "@components/system/Header/components/AccountMenu";

function Header(props: MOBXDefaultProps) {
  const headerRef = useRef(null);
  return (
    <header ref={headerRef} className="d-flex align-items-center px-4 header">
      <div className="header__right">
        <AccountMenu headerRef={headerRef}/>
      </div>
    </header>
  );
}

export default MobXRouterDecorator(Header);
