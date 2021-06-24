import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GameProfile } from '../models/GameProfile';

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
}
