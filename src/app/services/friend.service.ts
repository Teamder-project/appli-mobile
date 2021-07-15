import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gamer } from '../models/Gamer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(private httpClient : HttpClient) { }
  getById(id: string): Observable<Gamer[]> {
    return this.httpClient.get<Gamer[]>(`${environment.apiBaseUrl}/friends/gamer/${id}`)
  }
}
