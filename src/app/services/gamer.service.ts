import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Gamer } from '../models/Gamer';

@Injectable({
  providedIn: 'root'
})
export class GamerService {

  constructor(private httpClient : HttpClient) { }

  getAll(): Observable<Gamer[]> {
    return this.httpClient.get<Gamer[]>(`${environment.apiBaseUrl}/gamers`)
  }

  getById(id: string): Observable<Gamer> {
    return this.httpClient.get<Gamer>(`${environment.apiBaseUrl}/gamers/${id}`)
  }

  create(gamer: Gamer): Observable<Gamer> {
    return this.httpClient.post<Gamer>(`${environment.apiBaseUrl}/gamers`, gamer);
  }

  login(gamer: Gamer): Observable<string> {
    return this.httpClient.post(`${environment.apiBaseUrl}/gamers/login`, gamer, {responseType: "text"});
  }

  update(gamer: Gamer): Observable<Gamer> {
    return this.httpClient.put<Gamer>(`${environment.apiBaseUrl}/gamers`, gamer);
  }

  delete(id: string) {
    return this.httpClient.delete(`${environment.apiBaseUrl}/gamers/${id}`)
  }
}
