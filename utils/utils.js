import moment from 'moment';

const users = [];

const messages = [];

export const addMessage = (message) => {
  messages.push(message);
  return message;
};

export const getRoomMessages = (room) => {
  return messages.filter((message) => message.room === room);
};

export const getMessage = (id) => {
  return messages.find((message) => message.id === id);
};

export const userJoin = (id, username, room) => {
  const user = { id, username, room };
  users.push(user);
  return user;
};

export const getRoomUsers = (room) => {
  return users.filter((user) => user.room === room);
};

export const getUser = (id) => {
  return users.find((user) => user.id === id);
};

export const userLeave = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

export const formatMessage = (id, room, username, message, replyTo = null) => {
  return {
    id,
    room,
    replyTo,
    username,
    message,
    time: moment().format('h:mm a'),
  };
};
