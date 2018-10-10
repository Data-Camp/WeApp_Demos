import * as express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import { Server } from "./game/server";
import { config } from "./config";

var server = new Server();

var app = express();

app.use((request: express.Request, response: express.Response) => {
    
    response.send("it works");
    console.log(request.cookies);
});

server.init(config.rootPath, app);
server.start();