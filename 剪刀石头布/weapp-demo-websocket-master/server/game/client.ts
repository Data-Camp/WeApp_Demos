const md5 = require('md5');
import { Room } from "./room";
import { User } from "./user";
import { GameData } from "./game";
import { Robot } from "./robot";

/**
 * @fileOverview
 *
 * 对于每个 SocketIO 的链接，都会对应一个 Client，其中包括用户信息、Socket 的引用。
 *
 * @author: techird
 */
export class Client {
    private socket: SocketIO.Socket;
    public readonly id: string;
    public user: User;
    public gameData: GameData;
    public room: Room;

    constructor(socket: SocketIO.Socket) {
        console.log(`socket connected with id ${socket.id}`);
        this.id = socket.id;
        this.socket = socket;
        this.user = null;
        this.room = null;
        this.gameData = {
            choice: null,
            roundScore: 0,
            totalScore: 0,
            winStreak: 0
        };
    }

    connect() {
        this.on('hello', packet => {
            const user = packet.user as User;
            this.user = user;
            this.emit('hi', {
                message: 'welcome',
                nearby: 10
            });
        });
        this.on('join', packet => {
            if (this.room) {
                this.room.removeClient(this);
            }
            let room = this.room = Room.findRoomWithSeat() || Room.create();
            room.addClient(this);
            console.log(`room.isFull() == ${room.isFull()}`);
            if (room.isFull()) {
                room.playGame();
            }
        });
        this.on('choice', packet => {
            this.gameData.choice = packet.choice;
            this.broadcast('movement', {
                uid: this.user.uid,
                movement: "choice"
            });
        });
        this.on('face', packet => {
            this.broadcast('movement', {
                uid: this.user.uid,
                movement: "face",
                face: packet.face
            });
        });
        this.on('leave', packet => {
            if (this.room) {
                this.broadcast('leave', {
                    uid: this.user.uid
                });
                this.room.removeClient(this);
                this.room = null;
            }
        });
        this.on('disconnect', packet => {
            if (this.room) {
                this.room.removeClient(this);
                this.room = null;
            }
            this.socket.disconnect();
            this.socket = null;
            this.gameData = null;
            this.user = null;
        });
    }

    on(message: string, handle: Function) {
        var client = this;
        this.socket.on(message, function(...args) {
            console.log(`[client] ${message}`);
            console.log(args);
            handle.apply(client, args);
        });
    }

    emit(message: string, ...data: any[]) {
        this.socket.emit(message, ...data);
    }

    broadcast(message: string, ...data: any[]) {
        if (!this.room) return;
        this.others().forEach(neighbor => neighbor.emit(message, ...data));
    }

    others() {
        var me = this;
        return this.room.clients.filter(client => client != this);
    }
}

export type ClientType = Client;