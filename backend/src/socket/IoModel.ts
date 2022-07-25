import { Express } from 'express';
import { Socket } from 'socket.io';

const server = require('http');
const socket = require('socket.io');

export default class IoModel {
  http: any;

  io: Socket;

  currentId : string;

  idToSocketMap = new Map();

  constructor(app: Express) {

    if (process.env.SOCKET_PORT) {

    }
    this.io = socket(this.http, {
      cors: {
        origin: "*"
      }
    });

    this.io.on('connection', (socket) => {
      console.log('user connected')
    });
  }

  /**
   * req.app.get("socketService").emiter('message', req.body);
   * //anywhere with access to app:
   app.get("socketService").emiter('message', req.body);
   * @param event
   * @param body
   */
  emiter(event, body) {
    if(body)
      this.io.emit(event, body);
  }
}
