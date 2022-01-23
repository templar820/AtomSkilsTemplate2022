import React, {useState} from 'react';
import {inject, observer} from "mobx-react";
import {useTranslation} from "react-i18next";
import {makeStyles, TextField} from "@material-ui/core";
import MyError from "@/services/MyError";

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
    marginBottom: '12px',
  }
}));

interface IRegistrationCardProps {
  setAuthorizationCardView: () => void;
  services?: any;
}

const RegistrationCard = (props: IRegistrationCardProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');
  // const [isRemember, setIsRemember] = useState(false);
  const {t} = useTranslation();

  const classes = useStyles();

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== password1) throw new MyError({status: 400, detail: t("authorizationCard.errorPasswordMismatch")})
    await props.services.authService.register(email, password);
    await props.services.authService.authentication();
  }

  return (
    <>
      <h4 className="text-center mb-4">{t('authorizationCard.registration')}</h4>
      <form
        onSubmit={(e) => register(e)}
      >
        <TextField
          className={classes.input}
          label={t('authorizationCard.email')}
          variant="outlined"
          size="small"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          InputLabelProps={{ required: false }}
          type="email"
        />
        <TextField
          className={classes.input}
          label={t('authorizationCard.password')}
          variant="outlined"
          size="small"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          InputLabelProps={{ required: false }}
          type="password"
        />
        <TextField
          className={classes.input}
          label={t('authorizationCard.repeatPassword')}
          variant="outlined"
          size="small"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
          required
          InputLabelProps={{ required: false }}
          type="password"
        />
        <button className="btn btn-primary btn-block text-uppercase" type="submit">
          {t('authorizationCard.register')}
        </button>
        <button className="btn btn-link my-2" onClick={(e) => {
          e.preventDefault();
          props.setAuthorizationCardView();
        }}>
          {t('common.login')}
        </button>
        <hr className="mb-3 mt-0"/>
        <button className="btn btn-secondary btn-block text-uppercase">
          <i className="bi bi-google mr-2"/> {t('authorizationCard.loginGoogle')}
        </button>
      </form>
    </>
  )
}

export default inject('services')(RegistrationCard);
