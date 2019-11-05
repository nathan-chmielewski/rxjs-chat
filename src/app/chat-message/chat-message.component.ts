import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user/user.model';
import { UsersService } from '../user/users.service';
import { Message } from '../message/message.model';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {
    @Input() message: Message;
    currentUser: User;
    incoming: boolean;

  constructor(public usersService: UsersService) { }

  ngOnInit() {
    this.usersService.currentUser
        .subscribe(
            (user: User) => {
                this.currentUser = user;
                if (this.message.author && user) {
                    this.incoming = this.message.author.id !== user.id;
                }
            });
  }

}
