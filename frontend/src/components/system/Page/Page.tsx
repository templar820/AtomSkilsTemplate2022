import React, { useEffect } from 'react';
import { MOBXDefaultProps } from '@globalTypes';
import Header from '@components/system/Header/Header';
import Menu from '@components/system/Menu/Menu';
import './styles.scss';

interface PageProps extends MOBXDefaultProps{
  children : React.ReactNode
}

function Page(props: PageProps) {
  return (
    <div className="page">
      <Menu />
      <div className="page__wrapper">
        <Header />
        <div className="page__content p-4">
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default Page;
