import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

import { GooglePlus } from '@ionic-native/google-plus';

@Injectable()
export class AuthenticationProvider {
  authState: firebase.User;

  constructor(private afAuth: AngularFireAuth, private googlePlusSrv: GooglePlus, private platformSrv: Platform) {
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

  loginWithGoogle() {
    // According to the platform, select the best login approach
    if(this.platformSrv.is('cordova') && this.platformSrv.is('mobile')) {
      // Native login - Google account selector
      return this.nativeLoginWithGoogleAccountSelector();
    } else {
      // Web Login - Firebase
      return this.firebaseLoginWithGoogle();
    }
  }
  
  private nativeLoginWithGoogleAccountSelector() {
    return new Promise((resolve, reject) => {
      this.googlePlusSrv.login({
        'webClientId': '1064254593127-9loj51qsgn0a82a16gk79lft3tkec18e.apps.googleusercontent.com',
        'offline': true
      })
      .then(res => {
        firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
          .then(success => resolve(success))
          .catch(error => reject(error));
      })
      .catch(error => reject(error));
    });
  }

  private firebaseLoginWithGoogle() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  
  private firebaseLoginWithCredentials(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
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
