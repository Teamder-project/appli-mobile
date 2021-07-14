import { GameProfile } from "./GameProfile"

export class Swipe{
    private id : number
    private state : number
    private swiper : GameProfile
    private swiped : GameProfile

    constructor(state : number, swiper : GameProfile, swiped : GameProfile){
        this.state = state;
        this.swiper = swiper;
        this.swiped = swiped;
    }
}