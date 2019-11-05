import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { MessagesService } from '../message/messages.service';
import { ThreadsService } from '../thread/threads.service';
import { combineLatest } from 'rxjs/operators';
import { Message } from '../message/message.model';
import { Thread } from '../thread/thread.model';

@Component({
  selector: 'app-chat-nav-bar',
  templateUrl: './chat-nav-bar.component.html',
  styleUrls: ['./chat-nav-bar.component.css']
})
export class ChatNavBarComponent implements OnInit {
    unreadMessageCount: number;

  constructor(public messagesService: MessagesService,
              public threadsService: ThreadsService) { }

  ngOnInit() {
    // In the combineLatest callback function we’re returning an array with
    // currentThread and messages as its two elements.
    // Then we subscribe to that stream and we’re destructuring those objects in the
    // function call. Next we reduce over the messages and count the number of messages
    // that are unread and not in the current thread.
    this.messagesService.messages
    .pipe(combineLatest(
      this.threadsService.currentThread,
      (messages: Message[], currentThread: Thread) =>
        [currentThread, messages] ))

    .subscribe(([currentThread, messages]: [Thread, Message[]]) => {
      this.unreadMessageCount =
        _.reduce(
          messages,
          (sum: number, m: Message) => {
            const messageIsInCurrentThread: boolean = m.thread &&
              currentThread &&
              (currentThread.id === m.thread.id);
            // note: in a "real" app you should also exclude
            // messages that were authored by the current user b/c they've
            // already been "read"
            if (m && !m.isRead && !messageIsInCurrentThread) {
              sum = sum + 1;
            }
            return sum;
          },
          0);
    });
  }

}
