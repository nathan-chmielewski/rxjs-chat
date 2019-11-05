import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Thread } from './thread.model';
import { MessagesService } from '../message/messages.service';
import { map, combineLatest } from 'rxjs/operators';
import { Message } from '../message/message.model';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ThreadsService {
    // threads is a observable that contains the
    // most up to date list of threads
    // emits a map object with the id of the Thread
    // as the key and the Thread as the value
    threads: Observable<{ [key: string]: Thread }>;

    // emits an ordered list of threads with the newest first
    orderedThreads: Observable<Thread[]>;

    // contains the currently selected thread
    currentThread: Subject<Thread>
        = new BehaviorSubject<Thread>(new Thread());

    // contains the set of messages for the currently selected thread
    currentThreadMessages: Observable<Message[]>;

  constructor(public messagesService: MessagesService) {
      this.threads = messagesService.messages
        .pipe(map((messages: Message[]) => {
            // Store the message's thread in our accumulator `threads`
            const threads: {[key: string]: Thread} = {};
            messages.map((message: Message) => {
                threads[message.thread.id] = threads[message.thread.id] ||
                message.thread;

            // cache the most recent message of each thread
                const messagesThread: Thread = threads[message.thread.id];
                if (!messagesThread.lastMessage ||
                messagesThread.lastMessage.sentAt < message.sentAt) {
                    messagesThread.lastMessage = message;
                }
            });
            return threads;
    }));

      this.orderedThreads = this.threads
        .pipe(map((threadGroups: {[key: string]: Thread}) => {
            const threads: Thread[] = _.values(threadGroups);
            return _.sortBy(threads, (t: Thread) =>
                t.lastMessage.sentAt).reverse();
        }));

      this.currentThreadMessages = this.currentThread
            .pipe(combineLatest(messagesService.messages,
                                (currentThread: Thread,
                                 messages: Message[]) => {
                if (currentThread && messages.length > 0) {
                    return _.chain(messages)
                        .filter((message: Message) =>
                            (message.thread.id === currentThread.id))
                            .map((message: Message) => {
                                message.isRead = true;
                                return message;
                            }).value();
                } else {
                    return [];
                }
            }));

      this.currentThread.subscribe(this.messagesService.markThreadAsRead);
  }

  setCurrentThread(newThread: Thread): void {
      this.currentThread.next(newThread);
  }
}


