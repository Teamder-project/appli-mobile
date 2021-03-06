import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GamerService } from 'src/app/services/gamer.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  error = [];
  gamerForm: FormGroup;

  constructor(private fb: FormBuilder, private gamerService: GamerService, private router: Router) {
    this.gamerForm = this.fb.group({
      username: null,
      password: null,
      email: null,
      birthday: null,
      gender: null,
      country: null
    })
  }

  ngOnInit(): void {
  }

  onSubmit = () : void => {

    if(
      this.gamerForm.value.username != null &&
      this.gamerForm.value.password != null &&
      this.gamerForm.value.email != null &&
      this.gamerForm.value.birthday != null &&
      this.gamerForm.value.gender != null &&
      this.gamerForm.value.country != null){

      if(this.gamerForm.value.username.length < 2 || this.gamerForm.value.username.length > 50){
        this.error = [];
        this.error.push("Le pseudo doit être compris entre 2 et 50 caractères");
      }
      else
      if(this.gamerForm.value.password.length < 4 || this.gamerForm.value.password.length > 50){
        this.error = [];
        this.error.push("Le mot de passe doit être compris entre 4 et 50 caractères");
      }
      else {
        this.gamerService.create(this.gamerForm.value).subscribe(data => {
          this.router.navigate([`/home`]);
        })
      }
    }
    else {
      this.error = [];
      this.error.push("Veuillez remplir tout les champs");
    }
  }
}