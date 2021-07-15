import { Gamer } from "./Gamer";

export class FriendChat {
    id : number
    message : string;
    time : string;
    sender : Gamer;
    receiver : Gamer; 

    constructor(message: string, sender: Gamer, receiver: Gamer) {
        this.message = message;
        this.sender = sender;
        this.receiver = receiver;
    }


}