import { Component, OnInit, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { User } from '../user/user.model';
import { Thread } from '../thread/thread.model';
import { Observable } from 'rxjs';
import { MessagesService } from '../message/messages.service';
import { ThreadsService } from '../thread/threads.service';
import { UsersService } from '../user/users.service';
import { Message } from '../message/message.model';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWindowComponent implements OnInit {
    messages: Observable<any>;
    currentThread: Thread;
    draftMessage: Message;
    currentUser: User;

  constructor(public messagesService: MessagesService,
              public threadsService: ThreadsService,
              public usersService: UsersService,
              public el: ElementRef) { }

  ngOnInit() {
      this.messages = this.threadsService.currentThreadMessages;
      this.draftMessage = new Message();
      this.threadsService.currentThread.subscribe(
          (thread: Thread) => {
              this.currentThread = thread;
          }
      );

      this.usersService.currentUser.subscribe(
          (user: User) => {
              this.currentUser = user;
          }
      );

      // By using a setTimeout we’re telling JavaScript
      // that we want to run this function when it is
      // finished with the current execution queue.
      this.messages
          .subscribe(
              (messages: Message[]) => {
                  setTimeout(() => {
                      this.scrollToBottom();
                  });
              }
          );
  }

  sendMessage(): void {
      const m: Message = this.draftMessage;
      m.author = this.currentUser;
      m.thread = this.currentThread;
      m.isRead = true;
      this.messagesService.addMessage(m);
      this.draftMessage = new Message();
  }

  onEnter(event: any): void {
      this.sendMessage();
      event.preventDefault();
  }

  scrollToBottom(): void {
      const scrollPane: any = this.el
        .nativeElement.querySelector('.msg-container-base');
      scrollPane.scrollTop = scrollPane.scrollHeight;
  }

}
