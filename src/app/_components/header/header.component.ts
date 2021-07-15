import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { GamerService } from 'src/app/services/gamer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  label : string = "Connexion";
  connected: boolean = false;
  avatar : string;
  id : number;
  constructor(private router : Router, private gamerService: GamerService) {

    document.addEventListener('click', this.hideDropdownMobileOnOutsideClick.bind(this));

    router.events.forEach((event) => {
      if (event instanceof RoutesRecognized) {
        if (localStorage.getItem("id") != null) {
          this.connected = true;
          this.label = "Déconnexion";
          this.id = parseInt(localStorage.getItem("id"));
          this.gamerService.getById(this.id).subscribe(data => {
            this.avatar = data.avatar;
          })
        }
        else{
          this.connected = false;
          this.label = "Connexion";
        }
      }
    });

  }
  
  ngOnInit(): void {
    if (localStorage.getItem("id") != null) {
      this.connected = true;
    }
  }

  dropdownMobile(): void {
    document.getElementById("dropdown-content-mobile").classList.toggle("show");
  }

  hideDropdownMobile(): void {
    document.getElementById("dropdown-content-mobile").classList.remove("show");
  }

  hideDropdownMobileOnOutsideClick(event:any): void {
    if (!document.getElementById("dropdown-mobile").contains(event.target)){
      document.getElementById("dropdown-content-mobile").classList.remove("show");
    }
  }

  loginMobile(): void {
    this.hideDropdownMobile();
    if(this.connected) {
      localStorage.removeItem("id");
      this.connected = false;
      this.label = "Connexion";
      this.router.navigate(["home"]);
    }
    else{
      this.router.navigate(["auth"]);
    }
  }

  showDropdown(): void {
    document.getElementById("dropdown-content").style.display = "block";
  }

  hideDropdown(): void {
    document.getElementById("dropdown-content").style.display = "none";
  }
}



