const express = require("express");
const server = express();
const routes = require("./routes");


server.use("/", routes);

// Указываем папку public как статическую
server.use('/public', express.static('public'));

// Добавляем мопсика
server.set("view engine", "pug");
server.set("views", `./public/views`);


server.listen(3000);