import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { FriendChat } from 'src/app/models/FriendChat';
import { Gamer } from 'src/app/models/Gamer';
import { FriendChatService } from 'src/app/services/friend-chat.service';
import { FriendService } from 'src/app/services/friend.service';
import { GamerService } from 'src/app/services/gamer.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class ChatComponent implements OnInit, OnDestroy {
  private idFriend: number;
  private gamer: Gamer;
  private ws: WebSocket;

  friends : Gamer[];

  constructor(private router : Router, private gamerService: GamerService, private friendService : FriendService, private friendChatService: FriendChatService) { }
  ngOnDestroy(): void {
    this.ws.close();
  }

  ngOnInit(): void {
    if(localStorage.getItem("id") == null){
      this.router.navigate(["home"]);
    }
    this.connect();
    // Stock le profil du l'utilisateur connecté
    this.gamerService.getById(parseInt(localStorage.getItem("id"))).subscribe(data => {
      this.gamer = data;
    })
    // Récupère les amis et met le premier ami de la liste comme ami selectionné
    this.friendService.getById(localStorage.getItem("id")).subscribe(data => {
      this.friends = data;
      this.idFriend = this.friends[0].id;
      setTimeout(() => {
        console.log(this.idFriend)
        document.getElementById(String(this.idFriend)).classList.remove("display-none");
        this.scrollBottom();
      }, 50);
      // Réupère et affiche les messages pour chaque amis
      this.friendChatService.getMessagesByGamer(localStorage.getItem("id")).subscribe(messages => {
        this.scrollBottom();
        messages.forEach(message => {
          this.showMessage(message);
        })
      })
    });
  }

  /**
   * Appelé par event click
   * Change l'utilisateur selectionné
   * @param id
   */
  clickFriends = (id) => {
    if(window.innerWidth <= 550) {
      
      this.displayFriends();
    }
    document.getElementById(String(this.idFriend)).classList.add("display-none");
    this.idFriend= id;
    document.getElementById(String(this.idFriend)).classList.remove("display-none");
    this.scrollBottom();
  }

  /**
   * Scroll en bas des messages
   */
  scrollBottom = () => {
    document.getElementById(String(this.idFriend)).scrollTop = document.getElementById(String(this.idFriend)).scrollHeight - document.getElementById(String(this.idFriend)).clientHeight;
  }

  /**
   * Initialisation WebSocket
   */
  connect = () => {
    this.ws = new WebSocket("ws://localhost:8080/chat/" + localStorage.getItem("id"));
    this.ws.onmessage = this.receive.bind(event);
  }

  /**
   * Sauvegarde le message en BDD et l'envoie à la WebSocket
   */
  send = () => {
    if(document.getElementById("input-message")['value'] != "") {
      let content = document.getElementById("input-message")['value'];
      document.getElementById("input-message")['value'] = "";
      let message : any = {
        "message": content,
        "sender": { "id": localStorage.getItem("id") },
        "receiver": { "id": this.idFriend }
      }
      this.friendChatService.create(message).subscribe(data=>{
        message = data;
        // envoie le message à la websocket en Json
        let json = JSON.stringify(message);
        this.ws.send(json);
      })
    }
    else{
      alert("rentre un message")
    }
  }

  /**
   * Appelé par la WebSocket lorsqu'un message est reçu, converti l'objet et l'affiche
   * @param event objet reçu de la WebSocket
   */
  receive = (event) => {
    this.showMessage(JSON.parse(event.data));
  }

  /**
   * Affiche le message
   * @param message message a afficher
   */
  showMessage = (message: FriendChat) => {
    
    if(message.sender.id == Number(localStorage.getItem("id"))){
      document.getElementById(String(message.receiver.id)).innerHTML += 
      // Remplacer par une balise contenant le message envoyé par l'utilisateur connecté
      "<p class=envoyeur>"+ message.message+"</p>";
    }
    else{
      document.getElementById(String(message.sender.id)).innerHTML += 
        // Remplacer par une balise contenant le message envoyé par l'ami
        "<p class=receveur>"+ message.message+"</p>"
    }
    this.scrollBottom();
  }

  displayFriends = () => {
    console.log(document.getElementById("side-panel").style.display);
    if(document.getElementById("side-panel").style.display == "none") {
      document.getElementById("side-panel").style.display = "block";
      document.getElementById("card").style.display = "none"; 
    }
    else {
      document.getElementById("side-panel").style.display = "none";
      document.getElementById("card").style.display = "flex";
      this.scrollBottom();
    }
  }
}