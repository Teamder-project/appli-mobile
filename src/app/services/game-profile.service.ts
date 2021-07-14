import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GameProfile } from '../models/GameProfile';
import { Swipe } from '../models/Swipe';

@Injectable({
  providedIn: 'root'
})
export class GameProfileService {

  constructor(private httpClient : HttpClient) { }

  getProfilesByGamerId = (id : number) : Observable<GameProfile[]> => {
    return this.httpClient.get<GameProfile[]>(`${environment.apiBaseUrl}/game-profiles/gamer/${id}`)
  }

  getProfileById = (id : number) : Observable<GameProfile> => {
    return this.httpClient.get<GameProfile>(`${environment.apiBaseUrl}/game-profiles/${id}`)
  }

  createProfile = (profile : GameProfile) : Observable<GameProfile> => {
    return this.httpClient.post<GameProfile>(`${environment.apiBaseUrl}/game-profiles`, profile)
  }

  updateProfile = (profile : GameProfile) : Observable<GameProfile> => {
    return this.httpClient.patch<GameProfile>(`${environment.apiBaseUrl}/game-profiles`, profile)
  }

  getProfilesForSwipe = (id : number) : Observable<GameProfile[]> => {
    
    return this.httpClient.get<GameProfile[]>(`${environment.apiBaseUrl}/game-profiles/swipe/${id}`)
  }

  getProfilesWeDontHaveForSwipe = (id : number, id1 : number, id2 : number) : Observable<GameProfile[]> => {
    
    return this.httpClient.get<GameProfile[]>(`${environment.apiBaseUrl}/game-profiles/swipe/${id}/${id1}/${id2}`)
  }

  swipe = (swipe : Swipe) : Observable<Swipe> => {
    return this.httpClient.post<Swipe>(`${environment.apiBaseUrl}/swipes`, swipe)
  }
}
