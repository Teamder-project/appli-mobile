import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swiper, { EffectFlip } from 'swiper';

@Component({
  selector: 'app-swipe',
  templateUrl: './swipe.component.html',
  styleUrls: ['./swipe.component.css']
})
export class SwipeComponent implements OnInit {

  users = [
    { nom: "Pif", prenom: "Coucou", age: 26 },
    { nom: "Paf", prenom: "Cuicui", age: 30 },
    { nom: "Pouf", prenom: "Crucru", age: 58 },
    { nom: "toto", prenom: "roro", age: 12 },
    { nom: "titi", prenom: "riri", age: 27 },
    { nom: "tutu", prenom: "rara", age: 69 },
    { nom: "fufu", prenom: "momo", age: 14 },
    { nom: "coco", prenom: "mimi", age: 18 },
    { nom: "fafa", prenom: "mama", age: 78 },
  ]

  likes = [

  ]

  dislikes = [

  ]

  constructor(private router : Router) {
  }


  //charge le premier gamer, initialise le swiper, et boucle la fonction rafraichir()
  ngOnInit(): void {

    

    document.getElementById("nom-prenom").innerText = this.users[0].nom + " " + this.users[0].prenom;
   
    const swiper = new Swiper('.swiper-container', {
      //permet de mettre en place l'effet flip de la carte. Pour modifier la vitesse à laquelle elle se tourne, jouer avec les valeurs du speed.
      effect: 'flip',
      grabCursor: true,
      flipEffect: {
        slideShadows: false,
      
      },
      speed: 600,
      spaceBetween: 100,
      initialSlide: 1,
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: {
        nextEl: '.swiper-button-prev',
        prevEl: '.swiper-button-next'
      },
      //empêche le swipe sur la fonctionnalité "retour"
      noSwiping : true,
      noSwipingClass : 'retour'
    });
    
    swiper.on('reachBeginning', this.like);
    swiper.on('reachEnd', this.dislike);
    //setInterval(this.rafraichir, 100);
    
  }

  trigerFullScreen = () => {

    let fullscreen = document.querySelector("#fullscreen");
    let button = document.querySelector("#button");

    if(!document.fullscreenElement){
      fullscreen?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
  //verifie s'il y a eu swipe et execute like() ou dislike() selon le sens
  // rafraichir = () => {

  //   const swiper = document.querySelector('.swiper-container')['swiper'];
  //   let slide = document.getElementById("swipe2");
  //   if (slide.classList.contains("swiper-slide-next")) {
  //     this.like();
  //   } else if (slide.classList.contains("swiper-slide-prev")) {
  //     this.dislike();
  //   }
  // }

  //charge le prochain gamer, l'ajoute dans likes[] et renvoie sur la slide principale
  like = () => {

    // document.getElementById("swipe1").classList.remove("swiper-slide-active");
    // document.getElementById("swipe1").classList.add("swiper-slide-prev");
    // document.getElementById("swipe2").classList.remove("swiper-slide-next");
    // document.getElementById("swipe2").classList.add("swiper-slide-active");
    // document.getElementById("swipe3").classList.add("swiper-slide-next");

    this.likes.push(this.users.splice(0, 1));
    document.getElementById("nom-prenom").innerText = this.users[0].nom + " " + this.users[0].prenom;

    const swiper = document.querySelector('.swiper-container')['swiper'];
    setTimeout(function () { swiper.slideNext(800) }, 600);
    console.log("like");
  }

  //charge le prochain gamer, l'ajoute dans dislikes[] et renvoie sur la slide principale
  dislike = () => {

    // document.getElementById("swipe1").classList.add("swiper-slide-prev");
    // document.getElementById("swipe2").classList.remove("swiper-slide-prev");
    // document.getElementById("swipe2").classList.add("swiper-slide-active");
    // document.getElementById("swipe2").classList.remove("swiper-slide-active");
    // document.getElementById("swipe3").classList.add("swiper-slide-next");

    this.dislikes.push(this.users.splice(0, 1));
    document.getElementById("nom-prenom").innerText = this.users[0].nom + " " + this.users[0].prenom;

    const swiper = document.querySelector('.swiper-container')['swiper'];
    setTimeout(function () { swiper.slidePrev(800) }, 600);
    console.log("dislike");
  }

  
}