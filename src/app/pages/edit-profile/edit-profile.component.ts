import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GameProfile } from 'src/app/models/GameProfile';
import { GameProfileService } from 'src/app/services/game-profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  
  profile : GameProfile
  updatedProfile : FormGroup;
  error = [];
  
  constructor(
    private route : ActivatedRoute, 
    private serviceProfile : GameProfileService, 
    private fb: FormBuilder, 
    private router: Router){

  }

  /**
   * Récupération de l'id de l'url, récupération du profil par rapport à celui ci pour pouvoir afficher
   * les anciennes données dans le formulaire de modification
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe(url => {
      let id : number = Number(url.get("id"));
      this.serviceProfile.getProfileById(id).subscribe(profile => {
        this.profile = profile
        this.updatedData();
      })
    })
    
  }

  /** Verification si les champs sont null, retourne une erreur, sinon
   * Verifie si le pseudo n'est pas compris entre 2 et 50 caractères, retourne une erreur, sinon 
   * Envoie de la requête du service au back pour éditer un profil
   */
  editProfile = () => {
    if(
      this.updatedProfile.value.nickname_game != "" &&
      this.updatedProfile.value.goals != null &&
      this.updatedProfile.value.description != "" &&
      this.updatedProfile.value.gamer.id != null &&
      this.updatedProfile.value.game.id != null){

      if(this.updatedProfile.value.nickname_game.length < 2 || this.updatedProfile.value.nickname_game.length > 50){
        this.error = [];
        this.error.push("Le pseudo doit être compris entre 2 et 50 caractères");
      }
      else {
        this.serviceProfile.updateProfile(this.updatedProfile.value).subscribe(profile => {
          this.router.navigateByUrl("index");
        })
      }
    }
    else {
      this.error = [];
      this.error.push("Veuillez remplir tout les champs");
    }
  } 

  /**
   * Récupération des données modifiées
   */
  updatedData = () => {
    this.updatedProfile = this.fb.group({
      id: this.profile.id,
      nickname_game: this.profile.nickname_game,
      goals: this.profile.goals,
      description: this.profile.description,
      gamer: {
        id: parseInt(localStorage.getItem("id"))
      },
      game: this.fb.group({
        id: this.profile.game.id
      })
    });
  }
}
