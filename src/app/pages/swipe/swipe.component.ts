import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { GameProfile } from 'src/app/models/GameProfile';
import { Swipe } from 'src/app/models/Swipe';
import { GameProfileService } from 'src/app/services/game-profile.service';
import { GameService } from 'src/app/services/game.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-swipe',
  templateUrl: './swipe.component.html',
  styleUrls: ['./swipe.component.css']
})
export class SwipeComponent implements OnInit {
  
  alias: string;
  
  swiper: GameProfile;

  users: GameProfile[] = [];

  likes = [];

  dislikes = [];

  constructor(private gameService: GameService, private service: GameProfileService, private route: ActivatedRoute) {
  }


  //charge le premier gamer, initialise le swiper, et boucle la fonction rafraichir()
  ngOnInit(): void {

    this.route.paramMap.subscribe(url => {
      let id: number = Number(url.get("id"));
      this.service.getProfileById(id).subscribe(profileSwiper => {
        this.swiper = profileSwiper;
      })
    })
    this.getBackground();
    this.getProfiles();

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
      noSwiping: true,
      noSwipingClass: 'retour'
    });

    swiper.on('reachBeginning', this.like);
    swiper.on('reachEnd', this.dislike);
    //setInterval(this.rafraichir, 100);

  }

  getBackground = () => {
    this.route.paramMap.subscribe(url => {
      let id: number = Number(url.get("id"));
      this.service.getProfileById(id).subscribe(data => {
        this.alias = data.game.alias;
      })
    })
  }
  trigerFullScreen = () => {

    let fullscreen = document.querySelector("#fullscreen");
    let button = document.querySelector("#button");

    if (!document.fullscreenElement) {
      fullscreen?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  //charge le prochain gamer, l'ajoute dans likes[] et renvoie sur la slide principale
  like = () => {

    let swipe : Swipe = new Swipe(1, this.swiper, this.users.splice(0, 1)[0]);
    
    this.service.swipe(swipe).subscribe(element =>{
      if(this.users.length == 2) {
        this.getProfilesWhenOnly2Left();
      }
    });

    document.getElementById("avatar").setAttribute("src", "../../../assets/avatars/"+this.users[0].gamer.avatar+".jpg");
    document.getElementById("nom-prenom").innerText = this.users[0].nickname_game;
    document.getElementById("objectif").innerText = this.users[0].goals;
    document.getElementById("description").innerText = this.users[0].description;

    const swiper = document.querySelector('.swiper-container')['swiper'];
    setTimeout(function () { swiper.slideNext(800) }, 600);
  }

  //charge le prochain gamer, l'ajoute dans dislikes[] et renvoie sur la slide principale
  dislike = () => {
    let swipe : Swipe = new Swipe(0, this.swiper, this.users.splice(0, 1)[0]);
    
    this.service.swipe(swipe).subscribe(element =>{
      if(this.users.length == 2) {
        this.getProfilesWhenOnly2Left();
      }
    });

    document.getElementById("nom-prenom").innerText = this.users[0].nickname_game;
    document.getElementById("avatar").setAttribute("src", "../../../assets/avatars/"+this.users[0].gamer.avatar+".jpg");
    document.getElementById("objectif").innerText = this.users[0].goals;
    document.getElementById("description").innerText = this.users[0].description;

    const swiper = document.querySelector('.swiper-container')['swiper'];
    setTimeout(function () { swiper.slidePrev(800) }, 600);
  }

  getProfiles = () => {
    this.route.paramMap.subscribe(url => {
      let id: number = Number(url.get("id"));
      this.service.getProfilesForSwipe(id).subscribe(data => {
        data.forEach(element => {
          this.users.push(element);
        })
        console.log(this.users);
      })
    });

    setTimeout(() => {
      document.getElementById("objectif").innerText = "Mon objectif : "+this.users[0].goals;
      document.getElementById("description").innerText = this.users[0].description;
      document.getElementById("avatar").setAttribute("src", "../../../assets/avatars/"+this.users[0].gamer.avatar+".jpg");
      document.getElementById("nom-prenom").innerText = this.users[0].nickname_game;
    },
      500);
  }

  getProfilesWhenOnly2Left = () => {
    
    this.route.paramMap.subscribe(url => {
      let id: number = Number(url.get("id"));
      this.service.getProfilesWeDontHaveForSwipe(id, this.users[0].id, this.users[1].id).subscribe(data => {
        data.forEach(element => {
          this.users.push(element);
        })
      })
    });
  }

}