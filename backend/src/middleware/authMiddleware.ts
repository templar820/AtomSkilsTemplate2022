import session from 'express-session';
import passport from 'passport';
import Router from 'express';

import '../config/passportConfig';
import SessionStore from '../config/SessionStore';
import CONSTANT from '../config/CONSTANT';

const authMiddleware = Router();
authMiddleware.use(
  session({
    secret: CONSTANT.secretWord,
    store: SessionStore,
    cookie: {
      path: '/',
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 1000
    },
    saveUninitialized: false,
    resave: false,
  })
);

authMiddleware.use(passport.initialize());
authMiddleware.use(passport.session());

const auth = passport.authenticate('jwt', { session: false });

export {
  auth,
  authMiddleware
};
