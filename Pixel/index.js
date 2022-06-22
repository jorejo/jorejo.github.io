require("dotenv").config();
fs = require('fs');


const express = require("express");
const bodyParser = require("body-parser");
const { fstat } = require("fs");
const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);

const port = process.env.PORT || 9999;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
var lastImg = 0;


// Routes
app.get("/", function (req, res) {
  res.sendFile("index.html", { root: __dirname });
});
app.get("/status", function (req, res) {
  res.status(200).json({ status: "ok" });
});

// Connexion Websocket
io.on("connection", (socket) => {
  console.log(`Connected to client with Id ${socket.id}`);
  
  socket.on("Loaded", () =>{
    console.log(`client ${socket.id} Loaded ! send ${lastImg}`);
    socket.emit("s-picture", lastImg);
  })

  socket.on("c-picture", (obj) =>{
    console.log("c-picture", obj);
    lastImg = obj;
    socket.emit("s-picture", lastImg);
  })

});

server.in
// Start HTTP server
server.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port} !`);
});