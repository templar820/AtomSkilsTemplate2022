import React, {useEffect, useMemo, useState} from 'react';
import MobXRouterDecorator from "@components/HOC/MobXRouterDecorator";
import {MOBXDefaultProps} from "@globalTypes";

const Auth: React.FC<MOBXDefaultProps> = ({children, services, AppStore}) => {
  const [isReady, setIsReady] = useState(false);
  const authService = services.authService;

  useMemo(() => {
    AppStore.setLoader(true);
  }, []);

  useEffect(() => {
    authService.authentication().then(() => {
      AppStore.setLoader(false);
      setIsReady(true)
    });
  }, []);

  return isReady ? children : null;
};

export default MobXRouterDecorator(Auth, false);