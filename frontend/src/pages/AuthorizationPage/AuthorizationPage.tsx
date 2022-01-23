import React, {useState} from 'react';
import AuthorizationCard from "@pages/AuthorizationPage/components/AuthorizationCard";
import RegistrationCard from "@pages/AuthorizationPage/components/RegistrationCard";
import {useTranslation} from "react-i18next";
import {inject} from "mobx-react";
import './AuthorizationPage.scss';

const AuthorizationPage = () => {
  const [viewState, setViewState] = useState('authorization');
  const {t} = useTranslation();

  return (
    <div className="d-flex align-items-center justify-content-center h-100">
      <div className="authorization-card p-3">
        {
          viewState === 'authorization'
            ? <AuthorizationCard setRegistrationView={() => setViewState('registration')}/>
            : <RegistrationCard setAuthorizationCardView={() => setViewState('authorization')}/>
        }
      </div>
    </div>
  );
};

export default inject('services')(AuthorizationPage);
