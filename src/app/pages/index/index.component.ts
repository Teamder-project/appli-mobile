import { Component, OnInit } from '@angular/core';
import { GameProfile } from 'src/app/models/GameProfile';
import { GameProfileService } from 'src/app/services/game-profile.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  gameProfiles : GameProfile[] = [];

  constructor(private service : GameProfileService) { }

  /**
   * Récupération de l'id d'un gamer pour récuperer tout les profils lier à celui ci
   */
  ngOnInit(): void {
    this.service.getProfilesByGamerId(parseInt(localStorage.getItem("id"))).subscribe(data => {
      this.gameProfiles = data;
      this.deleteDivIfGamerAlreadyHaveOneProfileByGame();
    })
  }

  /**
   * Suppréssion de la div create-profile si le joueur à déjà 4 profils
   */
  deleteDivIfGamerAlreadyHaveOneProfileByGame = () => {
    let div = document.getElementById("create");
    if(this.gameProfiles.length > 3) {
      div.remove();
    }
  }



}
