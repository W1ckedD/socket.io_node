import path from 'path';
import http from 'http';
import express from 'express';
import { Server } from 'socket.io';

import * as utils from './utils/utils.js';

const app = express();
const __dirname = path.dirname('');

app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app).listen(5000, () => {
  console.log('server running on port 5000');
});

const io = new Server(server);


io.on('connection', (socket) => {
  socket.on('client:joinRoom', ({ username, room }) => {
    const user = utils.userJoin(socket.id, username, room);
    socket.join(user.room);
    io.to(user.room).emit('server:roomUsers', {
      room: user.room,
      users: utils.getRoomUsers(user.room),
    });
  });

  socket.on('client:message', (message) => {
    const user = utils.getUser(socket.id);
    io.to(user.room).emit(
      'server:message',
      utils.formatMessage(user.username, message)
    );
  });

  socket.on('disconnect', () => {
    const user = utils.userLeave(socket.id);
    if (user) {
      io.to(user.room).emit('server:roomUsers', {
        room: user.room,
        users: utils.getRoomUsers(user.room),
      });
    }
  });
});
