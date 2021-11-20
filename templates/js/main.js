const sendBtn = document.getElementById('send');
const messageInput = document.getElementById('inputMessage');
const chatContainer = document.getElementById('chatContainer');

sendBtn.addEventListener('click', addMessage);
messageInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    addMessage();
  }
})


function addMessage() {
  const msgText = messageInput.value;
  const message = document.createElement('div');
  message.classList.add('message');
  const p = document.createElement('p');
  p.innerHTML = msgText;
  message.appendChild(p);
  chatContainer.appendChild(message);
  messageInput.value = '';
}