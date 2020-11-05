/*
 */
const socket = io();

const output = document.getElementById("output");
const actions = document.getElementById("actions");
const username = document.getElementById("username");
const message = document.getElementById("message");
const send = document.getElementById("send");

send.addEventListener("click", () => {
  socket.emit("messageBrowser", {
    username: username.value,
    message: message.value,
  });
});

message.addEventListener("keypress", () => {
  socket.emit("typingBrowser", username.value);
});

socket.on("messageServer", (data) => {
  /* console.log(data); */
  actions.innerHTML = "";
  /*  output.innerHTML += `<p class="alert alert-primary"><strong>${data.username}</strong> ${data.message}</p>`; */
  output.innerHTML += `<div class="alert alert-primary alert-dismissible fade show">
  <strong>${data.username}</strong> ${data.message}
  <button type="button" class="close" data-dismiss="alert">
    <span>&times;</span>
  </button>
</div>`;
});

socket.on("typingServer", (data) => {
  actions.innerHTML = `<p><em>${data} is typing ...</em></p>`;
});
