"use strict";
const SOCKET_URL = "wss://fep-app.herokuapp.com";
let socket;

const nameEl = document.getElementById("name");
const msgEl = document.getElementById("msg");
const chatEl = document.querySelector(".chatBody");
const btn = document.getElementById("sendBtn");
btn.addEventListener("click", (e) => {
  e.preventDefault();
  sendMessage();
});

initConnection();

function initConnection() { 
  socket = new WebSocket(SOCKET_URL);

  socket.onopen = () => {
    console.log("Connection established");
  };

  socket.onmessage = onMessage;

  socket.onclose = () => {
    console.log("Connection lose");
    initConnection();
    console.log("Connection reestablished");
  };

  socket.onerror = (event) => {
    console.log("error", event);
  };
}

function onMessage({ data }) {
  const {
    payload: { author, message }
  } = JSON.parse(data);

  chatEl.insertAdjacentHTML(
    "beforeend",
    `<div class="chatMSG"><div>${author}</div>: <div>${message}</div></div>`
  );
}

function sendMessage() {
  const message = {
    action: "message",
    payload: {
      author: nameEl.value,
      message: msgEl.value
    }
  };
  socket.send(JSON.stringify(message));
  msgEl.value = "";
}
