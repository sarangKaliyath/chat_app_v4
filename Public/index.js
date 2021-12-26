const socket = io();

// const username = prompt("Enter username");
const input = document.querySelector(".input");
const button = document.querySelector(".button");
const display = document.querySelector(".display_box");
const ul = document.querySelector(".list");

button.addEventListener("click", () => {
  if (input.value) {
    socket.emit("input_message", input.value);
    input.value = "";
  }
});

socket.on("input_message", function (data) {
  const li = document.createElement("li");
  li.textContent = `${data.name}: ${data.data}`;
  ul.appendChild(li);
});

socket.on("user_joined", function (data) {
  const li = document.createElement("li");
  const h1 = document.createElement("h1");
  h1.textContent = `${data} has joined chat`;
  li.appendChild(h1);
  ul.appendChild(li);
});

socket.on("user_left", function (data) {
  const li = document.createElement("li");
  const h1 = document.createElement("h1");

  h1.textContent = `${data} has left chat`;
  li.appendChild(h1);
  ul.appendChild(li);
});

socket.emit("user_joined", username);
socket.emit("user_left", username);
