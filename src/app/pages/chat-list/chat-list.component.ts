import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  sendMsg : FormGroup;

  friends = [
    {pseudo: "toto", avatar:"default-img.jpg"},
    {pseudo: "titi", avatar:"default-img.jpg"},
    {pseudo: "tutu", avatar:"default-img.jpg"},
    {pseudo: "tata", avatar:"default-img.jpg"},
    {pseudo: "coco", avatar:"default-img.jpg"},
  ];
  constructor(private fb : FormBuilder) {
    this.sendMsg = this.fb.group({
      pseudo: ['Toto'],
      msg: [''],
      heure: [new Date()]
    })
   }

  ngOnInit(): void {
  }

  
  displayFriends = () => {
    let add = document.getElementById("add-list");
    add.classList.toggle('display');
  }

  sendMessage = () => {

    console.log(this.sendMsg.value);
    document.getElementById('input')['value'] = "";
  }
}
