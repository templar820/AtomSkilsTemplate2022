import { Express } from 'express';
import { Socket } from 'socket.io';
import socketioJwt from 'socketio-jwt';
import CONSTANT from '../config/CONSTANT';
import SessionStore from '../config/SessionStore';
import { defaultRespose } from '../middleware/responseHandler';

const server = require('http');
const socket = require('socket.io');

export default class IoModel {
  http: any;

  io: Socket;

  currentId : string;

  socketsMap = new Map();

  constructor(app: Express) {
    this.http = server.Server(app);
    this.io = socket(this.http, {
      cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
      }
    });
    console.log(true);
    this.io.use(socketioJwt.authorize({
      secret: CONSTANT.secretWord,
      handshake: true
    }));
    this.io.on('connection', (socket: any) => {
      console.log('SOCKET IS CONNECTED', socket.decoded_token.email);
      SessionStore.set(socket.handshake.query.token, { sid: socket.conn.id, ...socket.decoded_token });
      this.socketsMap.set(socket.decoded_token.email, socket);

      socket.emit('connection', 'SOCKET IS CONNECTED');
      // socket.on('product', this.productHandler);
      socket.on('disconnect', () => {
        SessionStore.destroy(socket.encoded_token);
        this.socketsMap.delete(socket.decoded_token.email);
        console.log('SOCKET DISCONNECT');
      });
    });

    app.use((req, res, next) => {
      res.io = this;
      next();
    });
  }

  sendInSession(email: string, channel: string, message: any) {
    const currentSocket = this.socketsMap.get(email) as Socket;
    if (currentSocket) currentSocket.emit(channel, defaultRespose(message))
  }

  sendAll(channel: string, message: any) {
    this.io.emit(channel, defaultRespose(message));
  }

  sendToUsers(channel: string, message: any, usersMail: string[]) {
    usersMail.forEach(email => this.sendInSession(email, channel, message));
  }
}
