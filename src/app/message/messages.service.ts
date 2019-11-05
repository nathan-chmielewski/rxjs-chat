import { Injectable } from '@angular/core';
import { Message } from './message.model';
import { Subject, Observable, } from 'rxjs';
import { User } from '../user/user.model';
import { Thread } from '../thread/thread.model';
import { filter, map, scan, publishReplay, refCount } from 'rxjs/operators';

const initialMessages: Message[] = [];

// A function interface for functions 
// that takes an array of Messages and returns an array of Messages
interface IMessagesOperation extends Function { 
    (messages: Message[]): Message[];
}

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
    // a stream that publishes Messages only once
    newMessages: Subject<Message> = new Subject<Message>();
    // a stream that emits an array of
    // the most up to date Messages
    messages: Observable<Message[]>;
    // updates receives operations/functions to be applied to messages
    // a way to perform changes on all messages that are currently stored
    // publishes Message array. Receives operations from create
    updates: Subject<any> = new Subject<any>();
    // create receives a new message and publishes function 
    // to add message to Messages array
    create: Subject<Message> = new Subject<Message>();
    markThreadAsRead: Subject<any> = new Subject<any>();

    constructor() {
        // watch the updates and accumulate operations on the messages
        this.messages = this.updates.pipe(scan((
            messages: Message[],
            operation: IMessagesOperation) => {
                return operation(messages);
            }, initialMessages), publishReplay(1), refCount()
        );

        // make sure we can share the most recent list of messages across anyone
        // who's interested in subscribing and cache the last known list of messages
        this.create
            .pipe(map( function(message: Message): IMessagesOperation {
                return (messages: Message[]) => {
                    return messages.concat(message);
                };
            }))
            .subscribe(this.updates);

        this.newMessages.subscribe(this.create);

        // Takes a thread and puts an operation on the updates stream
        // to mark the messages as read
        this.markThreadAsRead
        .pipe(map((thread: Thread) => {
            return (messages: Message[]) => {
                return messages.map((message: Message) => {
                    if (message.thread.id === thread.id) {
                        message.isRead = true;
                    }
                    return message;
                });
            };
        })).subscribe(this.updates);
    }

    addMessage(message: Message): void {
        // add Message to the newMessages stream
        this.newMessages.next(message);
    }

    messagesForThreadUser(thread: Thread, user: User): Observable<Message> {
        return this.newMessages.pipe(filter((message: Message) => {
                // message belongs to thread and is not written by the user
                return (message.thread.id === thread.id) &&
                       (message.author.id !== user.id);
          }));
      }
}

export const messagesServiceInjectables: Array<any> = [
    MessagesService
];
