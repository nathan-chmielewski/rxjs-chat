import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThreadsService } from 'src/app/thread/threads.service';

@Component({
  selector: 'app-chat-threads',
  templateUrl: './chat-threads.component.html',
  styleUrls: ['./chat-threads.component.css']
})
export class ChatThreadsComponent implements OnInit {
    threads: Observable<any>;

  constructor(public threadsService: ThreadsService) {
      // injecting ThreadsService and then
      // we’re keeping a reference to the orderedThreads
    this.threads = threadsService.orderedThreads;
  }

  ngOnInit() {
  }
}
