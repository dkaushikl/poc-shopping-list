import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthServiceProvider {
  private user: Observable<firebase.User>;

  constructor(private firebaseAuthSrv: AngularFireAuth) {
    this.user = firebaseAuthSrv.authState;
  }

  subscribeToUserAuthState() {
    console.log('AuthService: subscribing to authState!');
    return this.user;
  }

  signup(email: string, password: string) {
    this.firebaseAuthSrv
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
    this.firebaseAuthSrv
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        //this.user = user;
        console.log('Nice, it worked! ', this.user);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.firebaseAuthSrv.auth.signInWithPopup(provider)
      .then((credentials) => {
        console.log('Credentials: ', credentials);
        this.user = credentials.user;
      })
      .catch((error) => console.log('Error: ', error))
  }

  logout() {
    this.firebaseAuthSrv
      .auth
      .signOut();
  }

}
