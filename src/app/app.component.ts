import { Component } from '@angular/core';
import { MessagesService } from './message/messages.service';
import { ThreadsService } from './thread/threads.service';
import { UsersService } from './user/users.service';
import { ChatExampleData } from './data/chat-example-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rxjs-chat';

  constructor(public messagesService: MessagesService,
              public threadsService: ThreadsService,
              public usersService: UsersService,
              private router: Router) {
    ChatExampleData.init(messagesService, threadsService, usersService);
    }
}

