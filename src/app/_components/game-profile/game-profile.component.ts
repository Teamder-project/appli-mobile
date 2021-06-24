import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-profile',
  templateUrl: './game-profile.component.html',
  styleUrls: ['./game-profile.component.css']
})
export class GameProfileComponent implements OnInit {

  @Input() gameProfile;
  constructor() { }

  ngOnInit(): void {
  }

}
