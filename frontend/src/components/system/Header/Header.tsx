import React, { useEffect, useState } from 'react';

import {ButtonGroup, DropdownButton, Dropdown} from "react-bootstrap";
import MobXRouterDecorator from '@components/HOC/MobXRouterDecorator';
import { MOBXDefaultProps } from '@globalTypes';
import './styles.scss';

function Header(props: MOBXDefaultProps) {
  return (
    <header className="d-flex align-items-center px-2 header">
      <div className="header__right">
        <DropdownButton
          variant="outlined text-white pr-0"
          as={ButtonGroup}
          title={'userName'}
        >
          <Dropdown.Item
            onClick={() => {}}
          >
            Выйти
          </Dropdown.Item>
        </DropdownButton>
      </div>
    </header>
  );
}

export default MobXRouterDecorator(Header);
