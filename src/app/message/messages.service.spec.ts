import { TestBed } from '@angular/core/testing';

import { MessagesService } from './messages.service';
import { User } from '../user/user.model';
import { Thread } from '../thread/thread.model';
import { Message } from '../message/message.model';



describe('MessagesService', () => {
  it('should test', () => {
      const user: User = new User('Nate', '');
      const thread: Thread = new Thread('t1', 'Nate', '');
      const m1: Message = new Message({
          author: user,
          text: 'hi!',
          thread: thread
      });

      const m2: Message = new Message({
          author: user,
          text: 'bye!',
          thread: thread
      });

      const messagesService: MessagesService = new MessagesService();

    // listen to each message as it comes in
      messagesService.newMessages
        .subscribe( (message: Message) => {
          console.log('=> newMessages: ' + message.text);
      });

    // listen to the stream of most current messages
      messagesService.messages
      .subscribe( (messages: Message[]) => {
          console.log('=> messages: ' + messages.length);
      });

      messagesService.addMessage(m1);
      messagesService.addMessage(m2);

  });
});
