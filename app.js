const express = require("express");
const http = require("http");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const fallback=require('express-history-api-fallback');

require("dotenv").config();

const {startWS,listenForEvent} = require("./util/socketio/socketio");
const { CONTEST_EVENT } = require("./util/socketio/events");


const app = express();
let root = path.join(__dirname,'front/build');


app.use(require("cors")());
app.use(logger("dev"));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(root));


const PORT = process.env.PORT || 4000

start = async () => {
  try {
    await require("./util/db/mongo").mongoConnect(
      process.env.dbUser,
      process.env.dbPassword,
      process.env.dbHost
    );

    require("./app/router")(app);
    require("./util/errors/exceptionMiddleware")(app);

    app.use(fallback('index.html', { root: root }));

    let server = http.createServer(app);
    console.log("Trying on port "+PORT);
    startWS(server);
    server.listen(PORT,()=>{`Listening on port ${PORT}`});  //listen on port 80

    

  } catch (err) {
    console.log(err);
  }
};

start();

module.exports = app;
