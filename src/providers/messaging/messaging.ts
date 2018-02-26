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

  updateToken(token: string) {
    return new Promise((resolve, reject) => {
      console.log('Update token over: ', this.authSrv.getCurrentUserId());
      let docPath = `/fcmTokens/${this.authSrv.getCurrentUserId()}`;
      this.afs.doc(docPath)
        .ref.get()
        .then(doc => {
          let currentToken = {};
          console.log('Am i on native? ', this.utilSrv.isNativePlatform());
          if(doc.exists) {
            console.log('Exists the doc: ', doc.data());
            currentToken = doc.data();
            currentToken = (this.utilSrv.isNativePlatform()) ? { native: token } : { web: token };
            return this.afs.doc(docPath).update(currentToken);
          } else {
            console.log('No exists the doc');
            currentToken = (this.utilSrv.isNativePlatform()) ? { native: token } : { web: token };
            return this.afs.doc(docPath).set(currentToken);
          }
        })
        .then((result) => resolve('T>> ' + JSON.stringify(result)))
        .catch(err => reject(err));
    });
  }

  getPermission() {
    this.messaging.requestPermission()
      .then((a) => {
        console.log('Requested permissions: ', a);
        return this.messaging.getToken();
      })
      .then((token) => {
        console.log('TokeN web: ', token);
        return this.updateToken(token);
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
