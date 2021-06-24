import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Game } from '../models/Game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private httpClient : HttpClient) { }

  getAllGames = () : Observable<Game[]> => {
    return this.httpClient.get<Game[]>(`${environment.apiBaseUrl}/games`)
  }

  getGameById = (id : number) : Observable<Game> => {
    return this.httpClient.get<Game>(`${environment.apiBaseUrl}/games/${id}`)
  }
}
