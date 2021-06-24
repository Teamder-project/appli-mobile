import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Game } from 'src/app/models/Game';
import { GameProfileService } from 'src/app/services/game-profile.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent implements OnInit {

  games : Game[] = [];
  gamerProfileForm : FormGroup;
  error = [];
  isExistGame : Array<number> = [];

  constructor(private service : GameService, private serviceProfile : GameProfileService, private fb: FormBuilder, private router: Router) {
    this.gamerProfileForm = this.fb.group({
      nickname_game: null,
      goals: null,
      description: null,
      gamer: {
        id: parseInt(localStorage.getItem("id"))
      },
      game: this.fb.group({
        id: null
      })
    })
  }

  /**
   * Récupération de la liste de jeux 
   * Récupération des jeux sur lequel un joueur à un profil
   */
  ngOnInit(): void {
    this.service.getAllGames().subscribe(data => {
      this.games = data;
    })

    this.serviceProfile.getProfilesByGamerId(parseInt(localStorage.getItem("id"))).subscribe(data => {
      
      data.forEach(element => {

        this.isExistGame.push(element.game.id)
      });
    })
  }

  /**
   * Vérifie si un joueuur à déjà un profil sur un jeu
   * @returns true si le profil n'existe pas et false s'il existe
   */
  checkIfProfileAlreadyExist = () : boolean => {
   
    let bool : boolean = false;
    this.isExistGame.forEach(element => {
      if(this.gamerProfileForm.value.game.id == element) {
        bool = true;
      }
    })
    return bool;
  }

  /**
   * Verification si les champs sont null, retourne une erreur, sinon
   * Si le pseudo n'est pas compris entre 2 et 50 caractère, retourne une erreur, sinon
   * Conversion ID string en ID int, création de profil avec les informations récupérées dans le formulaire
   * Redirection sur l'index
   */
  createProfile = () => {

    if(
      this.gamerProfileForm.value.nickname_game != null &&
      this.gamerProfileForm.value.goals != null &&
      this.gamerProfileForm.value.description != null &&
      this.gamerProfileForm.value.gamer.id != null &&
      this.gamerProfileForm.value.game.id != null){

      if(this.checkIfProfileAlreadyExist()) {
        this.error = [];
        this.error.push("Vous avez déjà un profil sur ce jeu");
      }  
      else 
      if(this.gamerProfileForm.value.nickname_game.length < 2 || this.gamerProfileForm.value.nickname_game.length > 50){
        this.error = [];
        this.error.push("Le pseudo doit être compris entre 2 et 50 caractères");
      }
      else {
        this.gamerProfileForm.value.game.id = parseInt(this.gamerProfileForm.value.game.id);
        this.serviceProfile.createProfile(this.gamerProfileForm.value).subscribe(gameProfile => {
          this.router.navigateByUrl("index")
        });
      }
    }
    else {
      this.error = [];
      this.error.push("Veuillez remplir tout les champs");
    }
  }
}
