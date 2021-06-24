import { Game } from "./Game";

export class GameProfile {
    
    private _id : number;
    private _nickname_game : string;
    private _goals : string;
    private _description : string;
    private _game : Game;

    constructor(nickname: string, goals: string, description: string, game : Game) {
        this._nickname_game = nickname;
        this._goals = goals;
        this._description = description;
        this._game = game;
    }

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    public get game(): Game {
        return this._game;
    }

    public get nickname_game(): string {
        return this._nickname_game;
    }

    public get goals(): string {
        return this._goals;
    }

    public get description(): string {
        return this._description;
    }
}