const winston = require("winston");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const config = require("config");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
// const server = http.createServer(app); // Create an HTTP server
const swaggerSetup = require("./startup/swagger");
const socketIoHelper = require("./utility/socketIoHelper");

// Enable CORS middleware
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

// const io = socketIoHelper.initializeSocketIo(server); // Create a socket.io server using our HTTP server

require("./startup/logging")();
require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
// require("./startup/socketio")(io);
require("./middleware/prod")(app);

swaggerSetup(app);

// socketIo(io);

const port = process.env.PORT || config.get("port");
app.listen(port, () => winston.info(`Listening on port ${port}...`));

// module.exports = { server, io };
