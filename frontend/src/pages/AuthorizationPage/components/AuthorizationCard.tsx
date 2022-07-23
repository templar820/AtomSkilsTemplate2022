import React, {useState} from 'react';
import {Button, FormControl, InputLabel, makeStyles, MenuItem, Select, TextField} from "ui-kit";
import MobXRouterDecorator from "@components/HOC/MobXRouterDecorator";
import {MOBXDefaultProps} from "@globalTypes";
import {Roles} from "@services/Auth.service";

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
    marginBottom: '12px !important',
  }
}));

const AuthorizationCard = (props: MOBXDefaultProps) => {
  const [loginValue, setLoginValue] = useState('');
  const [cardState, setCardState] = useState<'authorization' | 'registration'>('authorization')
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Roles>(Roles.ADMIN);
  const classes = useStyles();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cardState === 'authorization') {
      await props.services.authService.login(loginValue, password);
      await props.services.authService.authentication();
    } else {
      await props.services.authService.register(loginValue, password, role);
      await props.services.authService.authentication();
    }
  }

  const changeView = (e) => {
    e.preventDefault();
    setPassword('');
    setLoginValue('');
    setRole(Roles.ADMIN);
    setCardState(cardState === 'authorization' ? 'registration': 'authorization')
  }

  return (
    <>
      <h4 className="text-center mb-4">{cardState === 'authorization' ? "Авторизация" : "Регистрация"}</h4>
      <form
        onSubmit={(e) => onSubmit(e)}
      >
        <TextField
          className={classes.input}
          label="Логин"
          variant="outlined"
          size="small"
          value={loginValue}
          onChange={(e) => setLoginValue(e.target.value)}
          required
          // InputLabelProps={{ required: false }}
        />
        <TextField
          className={classes.input}
          label="Пароль"
          variant="outlined"
          size="small"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          // InputLabelProps={{ required: false }}
          type="password"
        />
        {
          cardState === 'registration' && (
            <FormControl className={classes.input} variant="outlined">
              <InputLabel id="demo-controlled-open-select-label">Роль</InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value={Roles.ADMIN}>Администратор</MenuItem>
                <MenuItem value={Roles.USER}>Пользователь</MenuItem>
              </Select>
            </FormControl>)
        }
        <div className="d-flex justify-content-between align-items-center mt-3">
          <Button variant="contained" type="submit">
            {cardState === 'authorization' ? "Войти" : "Зарегистрироваться"}
          </Button>
          <button className="btn btn-link" onClick={(e) => changeView(e)}>
            {cardState === 'authorization' ? "Регистрация" : "Вход"}
          </button>
        </div>
      </form>
    </>
  );
};

export default MobXRouterDecorator(AuthorizationCard);
