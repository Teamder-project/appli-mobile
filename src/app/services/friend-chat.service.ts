import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FriendChat } from '../models/FriendChat';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FriendChatService {

  constructor(private httpClient : HttpClient) { }
  
  create(friendChat: FriendChat): Observable<FriendChat> {
    return this.httpClient.post<FriendChat>(`${environment.apiBaseUrl}/friend-chats`, friendChat);
  }

  getMessagesByGamer(idGamer: string): Observable<FriendChat[]> {
    return this.httpClient.get<FriendChat[]>(`${environment.apiBaseUrl}/friend-chats/gamer/${idGamer}`);
  }

  getMessages(idSender: number, idReceiver: number): Observable<FriendChat[]> {
    return this.httpClient.get<FriendChat[]>(`${environment.apiBaseUrl}/friend-chats/${idSender}/${idReceiver}`);
  }
}
