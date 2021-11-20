const sendBtn = document.getElementById('send');
const messageInput = document.getElementById('inputMessage');
const chatContainer = document.getElementById('chatContainer');
const roomName = document.getElementById('roomName');
const usersList = document.getElementById('usersList');

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

socket.emit('client:joinRoom', { username, room });

socket.on('server:roomUsers', ({ users, room }) => {
  setRoomName(room);
  setUsers(users);
});

socket.on('server:message', (data) => {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');
  const pDesc = document.createElement('p');
  pDesc.classList.add('desc');
  pDesc.innerHTML = `${data.username}   ${data.time}`;
  messageDiv.appendChild(pDesc);
  const p = document.createElement('p');
  p.innerHTML = data.message;
  messageDiv.appendChild(p);
  if (username === data.username) {
    messageDiv.classList.add('self');
  }
  chatContainer.appendChild(messageDiv);

  chatContainer.scrollTop = chatContainer.scrollHeight;
});

sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

function setRoomName(room) {
  roomName.innerHTML = room;
}

function setUsers(users) {
  usersList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerHTML = user.username;
    li.classList.add('users-list-item');
    usersList.appendChild(li);
  });
}

function sendMessage() {
  const msgText = messageInput.value;
  if (!msgText) {
    return;
  }

  socket.emit('client:message', msgText);
  messageInput.value = '';
}

function leaveRoom() {
  const leaveRoom = confirm('آیا مطمئنید که می خواهید اتاق را ترک کنید؟');
  if (leaveRoom) {
    window.location = '../index.html';
  } else {
  }
}

document.getElementById('leaveButton').addEventListener('click', leaveRoom);
