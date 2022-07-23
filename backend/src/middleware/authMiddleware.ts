import session from 'express-session';
import passport from 'passport';
import Router from 'express';

import '../config/passportConfig';
import SessionStore from '../config/SessionStore';
import CONSTANT from '../config/CONSTANT';
import { ServerError } from './errorHandler';

const authMiddleware = Router();
authMiddleware.use(
  session({
    secret: CONSTANT.SECRET_KEY,
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

const auth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err || !user) {
        throw new ServerError(401);
      } else {
        req.user = user;
        next();
      }
    })(req, res, next);
};

export {
  auth,
  authMiddleware
};
