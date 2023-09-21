const socket = io();

let name;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message_area');

do {
    name = prompt('Enter your name: ');
}while(!name);

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value);
    }
})

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }
    //append
    appendMessage(msg, 'outgoing');
    //clear textarea after sending message
    textarea.value = '';
    scrollToBottom();

    //send to server
    socket.emit('message', msg);
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
}

//Receive message
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
    scrollToBottom();
})

//automatic scrolling function
function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}