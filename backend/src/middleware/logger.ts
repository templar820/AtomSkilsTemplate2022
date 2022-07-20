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

morgan.format('logFormat', ':date, :url, :status, :response-time ms, :id, :RequestBody')

router.use(morgan('logFormat', {
      stream: fs.createWriteStream(`./access.log`, {flags: 'a'})
    }
));


export default router;
