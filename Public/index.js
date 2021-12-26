const socket = io();

const username = prompt("Enter username");
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

let flag = true;

socket.on("input_message", function (data) {
  flag = !flag;

  const li = document.createElement("li");
  li.textContent = `${data.name}: ${data.data}`;
  flag
    ? li.setAttribute("class", "text_first")
    : li.setAttribute("class", "text_second");
  ul.appendChild(li);
});

socket.on("user_joined", function ({ name }) {
  const li = document.createElement("li");
  li.textContent = `${name} has joined chat`;
  li.setAttribute("class", "user_joined");
  ul.appendChild(li);
});

socket.on("user_left", function ({ name }) {
  const li = document.createElement("li");
  li.textContent = `${name} has left chat`;
  li.setAttribute("class", "user_left");
  ul.appendChild(li);
});

socket.emit("user_joined", username);
socket.emit("user_left", username);
