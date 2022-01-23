import Router from 'express'
import fs from "fs"
import morgan from 'morgan';



const router = new Router();


morgan(function (tokens: any, req: any, res: any) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
})
morgan.token('id',  (req: any, res: any) => { return req.headers.token })
morgan.token('RequestBody',  (req: any, res: any) => { return JSON.stringify(req.body) })

const morganSettings = "RequestType=:method URL=:url Status=:status ResponseTime=:response-time Token=:id RequestBody=:RequestBody"
const date = new Date();
const fileName = date.toISOString().split('T')[0];

router.use(morgan(morganSettings, {
  stream: fs.createWriteStream(`./log/${fileName}.log`, {flags: 'a'})
}));

router.use(morgan(morganSettings));


export default router;
