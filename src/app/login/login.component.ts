import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  login(username: string, password: string): boolean {
      if(!this.authService.login(username, password)) {
          console.log('Incorrect credentials');
      }
      return false;
  }

  logout(): boolean {
      this.authService.logout();
      return false;
  }
}
