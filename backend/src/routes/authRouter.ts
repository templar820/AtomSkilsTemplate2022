import passport from 'passport';
import jwt from 'jsonwebtoken';
import { asyncMiddleware } from '../middleware/asyncMiddleware';
import UserController from '../controllers/UserController';
import { ServerError } from '../middleware/errorHandler';
import BaseRouter, { requestType } from './BaseRouter';
import { auth } from '../middleware/authMiddleware';
import { User } from '../models/DbModel';

class AuthRouter extends BaseRouter {
  constructor() {
    super();
    this.createHandleWithBody(requestType.POST, '/user/register', UserController.createUser);

    this.router.get('/user/logout', (req, res) => {
      req.logOut();
      res.sendFormat(null);
    });

    this.router.post('/user/login', async function(req, res, next) {
    const { email, password } = req.body;
    if (email && password) {
      // we get the user with the name and save the resolved promise
      let user = await User.findOne({where: {email}});
      if (!user) {
        return next(new ServerError(400, 'Пользователь не найден'));
      } else {
        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            return next(new ServerError(400, 'Ошибка при проверке пароля'));
          }
          if (isMatch) {
            const { email, id, role } = user;
            const token = jwt.sign({ email, id, role }, process.env.SECRET_KEY || 'hacktemplate');
            return res.sendFormat({ token });
          } else {
            return next(new ServerError(401, 'Неверный пароль'));
          }
        })
      }
    }
  })

    this.router.get('/user/userInfo', auth, asyncMiddleware(async (req: Request, res: Response) => {
      res.sendFormat(await UserController.getUserByToken(req.user.id));
    }));
  }

  authenticate(req: Request, res: Response, next) {
    passport.authenticate('local', { session: true }, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(new ServerError(400, 'Некоректный логин или пароль'));
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
