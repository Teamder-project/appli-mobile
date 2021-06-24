export class Game {
    
    private _id : number;
    private _name : string;
    private _editor : string;
    private _released : Date;
    private _alias : string

    constructor(id: number, name: string, editor: string, released: Date, alias : string) {
        this._id = id;
        this._name = name;
        this._editor = editor;
        this._released = released;
        this._alias = alias;
    }

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    public get alias(): string {
        return this._alias;
    }
    public get name(): string {
        return this._name;
    }
    public get editor(): string {
        return this._editor;
    }
    public get released(): Date {
        return this._released;
    }
}