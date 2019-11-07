import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  // login(username: string, password: string): boolean {
  //     if(!this.authService.login(username, password)) {
  //         console.log('Incorrect credentials');
  //     }
  //     return false;
  // }

  login(email: string, password: string) {
    this.authService.login(email, password);
  }

  // logout(): boolean {
  //     this.authService.logout();
  //     return false;
  // }
  logout() {
    this.authService.logout();
  }
}
