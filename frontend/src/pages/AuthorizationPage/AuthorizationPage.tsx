import React, {useState} from 'react';
import AuthorizationCard from "@pages/AuthorizationPage/components/AuthorizationCard";
import { inject } from "mobx-react";
import './AuthorizationPage.scss';

const AuthorizationPage = () => {

  return (
    <div className="d-flex align-items-center justify-content-center h-100">
      <div className="authorization-card p-3">
        <AuthorizationCard />
      </div>
    </div>
  );
};

export default AuthorizationPage;
