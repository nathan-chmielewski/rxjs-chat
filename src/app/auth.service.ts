import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    status: boolean = false;

  constructor(private angularFireAuth:AngularFireAuth) {
   }

  login(email: string, password: string) {
    this.angularFireAuth
    .auth
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      console.log('Successfully signed in!');
    })
    .catch(err => {
      console.log('Incorrect credentials:', err.message);
    });
  }

//   logout(): any {
    //   localStorage.removeItem('username');
//   }

  logout() {
    this.angularFireAuth
    .auth
    .signOut();
  }

//   getUser(): any {
//       return localStorage.getItem('username');
//   }

  isLoggedIn(): boolean {
    //   return false;
    this.angularFireAuth.authState.subscribe(res => {
        if (res && res.uid) {
          console.log('user is logged in');
          this.status = true;
        } else {
          console.log('user not logged in');
          this.status = false;
        }
      });
      return this.status;
  }
}
