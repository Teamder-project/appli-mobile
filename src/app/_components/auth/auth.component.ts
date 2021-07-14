import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GamerService } from 'src/app/services/gamer.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  label: string = "connexion";

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private service: GamerService, private router: Router) {
    this.loginForm = this.fb.group({
      email: '',
      password: ''
    })
  }

  ngOnInit(): void {
    if (localStorage.getItem("id") != null) {
      this.label = "déconnexion";
    }
  }

  onSubmit(): void {
    document.getElementById("login-content").style.display = "none";
    this.service.login(this.loginForm.value).subscribe(data => {
      localStorage.setItem("id", data);
      this.label = "déconnexion";
      document.getElementById("email")["value"] = "";
      document.getElementById("password")["value"] = "";
      this.loginForm.value.email = "";
      this.loginForm.value.password = "";
      this.router.navigate(["index"]);
    })
  }

  logOut(): void {
    if (this.label == "déconnexion") {
      localStorage.removeItem("id");
      this.label = "connexion";
    }
    this.router.navigate(["home"]);
  }

}
