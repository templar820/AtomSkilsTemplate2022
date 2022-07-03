import React, { useEffect } from 'react';
import MobXRouterDecorator from '@components/HOC/MobXRouterDecorator';
import { MOBXDefaultProps } from '@globalTypes';
import Header from '@components/system/Header';

interface PageProps extends MOBXDefaultProps{
  children : React.ReactNode
}

function Page(props: PageProps) {
  return (
    <div className="w-100 h-100 mh-100">
      <Header />
      <div className="d-flex flex-column w-100 h-100 mh-100">
        {props.children}
      </div>
    </div>
  );
}

export default Page;
