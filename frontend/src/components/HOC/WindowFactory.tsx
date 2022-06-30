import React from 'react';
import MobXRouterDecorator from '@components/HOC/MobXRouterDecorator';
import { MOBXDefaultProps } from '@globalTypes';
import PageNotFound from '@components/system/PageNotFound';

export enum WindowType{
  NotFoundPage
}

interface ConfirmWindowFactoryProps extends MOBXDefaultProps{
  type: WindowType;
}

function WindowFactory(props: ConfirmWindowFactoryProps) {
  switch (props.type) {
    case WindowType.NotFoundPage:
      return (
        <PageNotFound action={(
          <button
            className="btn important green"
            onClick={() => {
              props.history.push('/');
            }}
          >
            На главную
          </button>
        )}
        />
      );
    default:
      return null;
  }
}

export default MobXRouterDecorator(WindowFactory);
