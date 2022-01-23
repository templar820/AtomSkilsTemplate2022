import passport from 'passport';
import jwt from 'jsonwebtoken';
import { asyncMiddleware } from '../middleware/asyncMiddleware';
import UserController from '../controllers/UserController';
import { ServerError } from '../middleware/errorHandler';
import BaseRouter, { requestType } from './BaseRouter';
import { auth } from '../middleware/authMiddleware';
import SessionStore from "../config/SessionStore";

class AuthRouter extends BaseRouter {
  constructor() {
    super();
    this.createHandleWithBody(requestType.POST, '/user/register', UserController.createUser);

    this.router.get('/user/logout', (req, res) => {
      req.logOut();
      res.sendFormat(null);
    });

    this.router.post('/user/login', this.authenticate);

    this.router.get('/user/userInfo', auth, asyncMiddleware(async (req: Request, res: Response) => {
      console.log(req.user.id);
      res.sendFormat(await UserController.getUserByToken(req.user.id));
    }));
  }

  authenticate(req: Request, res: Response, next) {
    passport.authenticate('local', { session: true }, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(new ServerError(400, 'Incorrect login or password'));
      }
      req.logIn(user, { session: false }, (err) => {
        if (err) {
          return next(err);
        }
        const { email, id, role } = user;
        const token = jwt.sign({ email, id, role }, process.env.SECRET_KEY || 'hacktemplate');
        return res.sendFormat({ token });
      });
    })(req, res, next);
  }
}

export default new AuthRouter().router;
