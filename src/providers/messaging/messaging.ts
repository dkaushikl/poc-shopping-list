import { Injectable } from '@angular/core';

import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import * as firebase from 'firebase';
import { AngularFirestore } from 'angularfire2/firestore';

import { AuthenticationProvider } from './../authentication/authentication';
import { UtilProvider } from './../utils/util';

@Injectable()
export class MessagingProvider {
  messaging = firebase.messaging();
  messages$ = new BehaviorSubject(null);

  constructor(private afs: AngularFirestore, private authSrv: AuthenticationProvider, private utilSrv: UtilProvider) {
    console.log('Hello MessagingProvider Provider');
  }

  updateToken(token) {
    this.authSrv.getUserObservable().subscribe(
      (auth) => (auth && auth.uid) 
        ? this.afs.doc(`/fcmTokens/${this.authSrv.getCurrentUserId()}`).set({ token })
        : null 
    );
  }

  getPermission() {
    this.messaging.requestPermission()
      .then(() => {
        return this.messaging.getToken();
      })
      .then((token) => {
        console.log('TokeN: ', token);
        this.updateToken(token);
      })
      .catch(error => this.utilSrv.showToast(`Error: Unable to get permission to notify (${error})`));
  }

  receiveMessage() {
    this.messaging.onMessage((payload) => {
      console.log("Message received. ", payload);
      this.messages$.next(payload);
    });
  }

}
