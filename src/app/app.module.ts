import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { ChatNavBarComponent } from './chat-nav-bar/chat-nav-bar.component';
import { ChatThreadsComponent } from './chat-threads/chat-threads.component';
import { ChatThreadComponent } from './chat-thread/chat-thread.component';
import { MessagesService } from './message/messages.service';
import { ThreadsService } from './thread/threads.service';
import { UsersService } from './user/users.service';
import { FromNowPipe } from './pipes/from-now.pipe';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { LoggedInGuard } from './logged-in.guard';

const routes: Routes = [
    { path: '', redirectTo: 'app-login', pathMatch: 'full' },
    { path: 'app-login', component: LoginComponent },
    { path: 'app-chat-page', component: ChatPageComponent, canActivate: [ LoggedInGuard ] }
];

@NgModule({
  declarations: [
    AppComponent,
    ChatThreadsComponent,
    ChatThreadComponent,
    ChatWindowComponent,
    ChatMessageComponent,
    ChatNavBarComponent,
    FromNowPipe,
    ChatPageComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    RouterModule.forRoot(routes)
  ],
  providers: [MessagesService, ThreadsService, UsersService, AuthService, LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
