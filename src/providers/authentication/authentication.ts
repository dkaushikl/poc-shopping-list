import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthenticationProvider {
  authState: firebase.User;

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(
      (auth) => { this.authState = auth; }
    );
  }

  signup(email: string, password: string) {
    this.afAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });    
  }

  login(email: string, password: string) {
    this.afAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        console.log('Nice, it worked! ', user);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credentials) => {
        console.log('Credentials: ', credentials);
      })
      .catch((error) => console.log('Error: ', error))
  }

  getUserObservable() {
    return this.afAuth.authState;
  }

  getCurrentUser() {
    return (this.authState !== null) ? this.authState : null;
  }

  getCurrentUserId() {
    return (this.authState !== null) ? this.authState.uid : '';
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

}
