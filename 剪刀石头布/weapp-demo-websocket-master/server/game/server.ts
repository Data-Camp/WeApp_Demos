/**
 * @fileOverview
 *
 * 协同服务器
 *
 * @author: techirdliu
 */
import * as fs from "fs";
import * as path from "path";
import * as http from "http";
import * as SocketIO from "socket.io";
import { config } from "../config";

import { Client } from "./client";

const mainPath = path.dirname(require.main.filename);
const UTF8 = { encoding: 'utf-8' };

export class Server {

    /** Port that server listen on */
    public port: number = null;

    /** HTTP Server instance for both express and socket io */
    public http: http.Server = null;

    /** Socket io instance */
    public io: SocketIO.Server = null;

    init(path: string, requestListener) {
        this.port = process.env.PORT;
        this.http = http.createServer(requestListener);
        this.io = SocketIO(this.http, { path });
        this.io.on("connection", socket => {
            const client = new Client(socket);
            client.connect();
        });
    }

    start() {
        this.http.listen(this.port);
        console.log(`---- server started. listen : ${this.port} ----`);
    }
}