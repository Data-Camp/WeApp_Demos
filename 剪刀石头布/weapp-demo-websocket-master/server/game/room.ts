import { ClientType as Client } from "./client";
import { judge } from "./game";

const globalRoomList: Room[] = [];

// 每个房间最多两人
const MAX_ROOT_MEMBER = 2;

//
const ADD_ROBOT_AFTER = 10000;

// 游戏时间
const GAME_TIME = 3;

let nextRoomId = 0;

/** 表示一个房间 */
export class Room {
    public readonly id = `room${nextRoomId++}`;
    public readonly clients: Client[] = [];
    public readonly file: File = null;

    /**
     * @params filedId 会话绑定的文件 ID
     */
    private constructor() {
        this.clients = [];
    }

    /** 添加编辑客户端到会话 */
    public addClient(client: Client) {
        console.log(`client ${client.id} enter room ${this.id}`);
        this.clients.push(client);
        setTimeout(() => {
            if (this.clients.length < MAX_ROOT_MEMBER) {
                const Robot = require("./robot").Robot;
                new Robot();
            }
        }, 1000);
    }

    /** 从会话删除指定编辑客户端 */
    public removeClient(client: Client) {
        const clientIndex = this.clients.indexOf(client);
        if (clientIndex != -1) {
            this.clients.splice(clientIndex, 1);
        }
        if (this.clients.length === 0) {
            const roomIndex = globalRoomList.indexOf(this);
            if (roomIndex > -1) {
                globalRoomList.splice(roomIndex, 1);
            }
        }
    }

    public isFull() {
        return this.clients.length == MAX_ROOT_MEMBER;
    }

    public playGame() {
        console.log('game started!');
        this.clients.forEach(client => {
            client.gameData.roundScore = 0;
        });
        const roomUsers = this.clients.map(x => Object.assign({}, (x.user), x.gameData));
        this.clients.forEach(client => {
            client.emit('start', {
                gameTime: GAME_TIME,
                roomUsers
            });
        });
        setTimeout(() => this.finishGame(), GAME_TIME * 1000);
    }

    public finishGame() {
        const clients = this.clients;
        for (let i = 0; i < MAX_ROOT_MEMBER; i++) {
            let player1 = clients[i];
            if (!player1) break;
            for (let j = i + 1; j < MAX_ROOT_MEMBER; j++) {
                let player2 = clients[j];
                // 逃走的 2 号玩家
                const result = judge(player1.gameData.choice, player2.gameData.choice);
                if (result < 0) {
                    player1.gameData.roundScore += 1;
                    player2.gameData.roundScore -= 1;
                }
                else if (result > 0) {
                    player1.gameData.roundScore -= 1;
                    player2.gameData.roundScore += 1;
                }
            }
        }
        clients.forEach(client => {
            const gameData = client.gameData;
            if (gameData.roundScore > 0) {
                gameData.winStreak++;
                gameData.roundScore *= gameData.winStreak;
            } else if (gameData.roundScore < 0) {
                gameData.roundScore = 0;
                gameData.winStreak = 0;
            }
            gameData.totalScore += gameData.roundScore;
        });
        const result = clients.map(client => {
            const { uid } = client.user;
            const { roundScore, totalScore, winStreak, choice } = client.gameData;
            return { uid, roundScore, totalScore, winStreak, choice };
        });
        clients.forEach(client => {
            client.emit('result', { result });
        });
    }

    static all() {
        return globalRoomList.slice();
    }

    static findRoomWithSeat() {
        return globalRoomList.find(x => !x.isFull());
    }

    static create() {
        const room = new Room();
        globalRoomList.unshift(room);
        return room;
    }
}

export type RoomType = Room;