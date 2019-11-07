import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    userData: Observable<firebase.User>;

  constructor(private angularFireAuth:AngularFireAuth) {
      this.userData = angularFireAuth.authState;
   }

//   login(email: string, password: string): boolean {
    //   if (user === 'user' && password === 'password') {
    //       localStorage.setItem('username', user);
    //       return true;
    //   }
    //   return false;
    // }

    login(email: string, password: string) {
    this.angularFireAuth
    .auth
    .signInWithEmailAndPassword(email, password)
    .then(res => {
      console.log('Successfully signed in!');
    })
    .catch(err => {
      console.log('Something is wrong:',err.message);
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

  isLoggedIn() {
    //   return false;
    this.angularFireAuth.authState.subscribe(res => {
        if (res && res.uid) {
          console.log('user is logged in');
        } else {
          console.log('user not logged in');
        }
      });
  }
}
