import { Game } from "./Game";
import { Gamer } from "./Gamer";

export class GameProfile {
    
    private _id : number;
    private _nickname_game : string;
    private _goals : string;
    private _description : string;
    private _game : Game;
    private _gamer : Gamer;

    constructor(nickname: string, goals: string, description: string, game : Game, gamer : Gamer) {
        this._nickname_game = nickname;
        this._goals = goals;
        this._description = description;
        this._game = game;
        this._gamer = gamer
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

    public get gamer(): Gamer {
        return this._gamer;
    }

    public set gamer(gamer : Gamer) {
        this._gamer = gamer;
    }
}