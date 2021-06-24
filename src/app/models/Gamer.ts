export class Gamer {
    private _id : number;
    private _username : string;
    private _password : string;
    private _email : string;
    private _birthday : string;
    private _gender : string;
    private _country : string;
    private _avatar : string;

    constructor(id: number, username: string, password: string, email: string, birthday: string, gender: string, country: string, avatar: string) {
        this._id = id;
        this._username = username;
        this._password = password;
        this._email = email;
        this._birthday = birthday;
        this._gender = gender;
        this._country = country;
        this._avatar = avatar;
    }

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
}