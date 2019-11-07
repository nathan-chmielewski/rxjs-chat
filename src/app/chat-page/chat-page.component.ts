import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit {
  show: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.show = !this.show;
  }

}
