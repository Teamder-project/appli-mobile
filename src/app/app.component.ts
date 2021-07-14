import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Teamder';

  showHead: boolean = true;

  ngOnInit() {
  }
  constructor(private router: Router) {
  // evenement sur le header : si url est "/swipe", le header disparait, sinon, il est présent. Voir *ngif dans l'app component HTML.
    router.events.forEach((event) => {
      // NavigationStart : permet de trigger un event en lien avec un changement d'URL.
      // if (event instanceof NavigationStart) {
      //   if (this.router.url.startsWith("/")) {
      //     this.showHead = false;
      //   } else {
         
      //     this.showHead = true;
      //   }
      // }
    });
  }
}
