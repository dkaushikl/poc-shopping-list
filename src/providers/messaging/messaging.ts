import { Injectable } from '@angular/core';

import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import * as firebase from 'firebase';
import { Firebase } from '@ionic-native/firebase';
import { AngularFirestore } from 'angularfire2/firestore';

import { AuthenticationProvider } from './../authentication/authentication';
import { UtilProvider } from './../utils/util';

@Injectable()
export class MessagingProvider {
  messaging = firebase.messaging();
  messages$ = new BehaviorSubject(null);

  constructor(
    private afs: AngularFirestore, 
    private authSrv: AuthenticationProvider, 
    private firebaseSrv: Firebase,
    private utilSrv: UtilProvider
  ) {
    console.log('Hello MessagingProvider Provider');
  }

  getFirebaseToken() {
    this.firebaseSrv.getToken()
      .then(token => {
        return this.registerToken(token);
      })
      .catch(error => this.utilSrv.showToast('Error registering device: ' + JSON.stringify(error)));
  }

  registerToken(token: string) {
    return new Promise((resolve, reject) => {
      console.log('Registering token...');
      return (this.utilSrv.isNativePlatform())
        ? this.registerNativeToken(token)
        : this.registerWebToken(token)
    });
  }

  getPermission() {
    this.messaging.requestPermission()
      .then(() => {
        return this.messaging.getToken();
      })
      .then((token) => {
        console.log('TokeN web: ', token);
        return this.registerToken(token);
      })
      .catch(error => this.utilSrv.showToast(`Error: Unable to get permission to notify (${error})`));
  }

  receiveMessage() {
    this.messaging.onMessage((payload) => {
      console.log('Message received: ', payload);
      this.messages$.next(payload);
    });
  }

  private registerNativeToken(nativeToken: string) {
    return new Promise((resolve, reject) => {
      console.log('Update token over: ', this.authSrv.getCurrentUserId());
      let docPath = `/fcmTokens/${this.authSrv.getCurrentUserId()}`;
      this.afs.doc(docPath)
        .ref.get()
        .then(doc => {
          let currentToken = {};
          if(doc.exists) {
            currentToken = doc.data();
            currentToken['native'] = nativeToken;
            return this.afs.doc(docPath).update(currentToken);
          } else {
            currentToken['native'] = nativeToken;
            return this.afs.doc(docPath).set(currentToken);
          }
        })
        .then((result) => resolve('T (updateNativeToken) >> ' + JSON.stringify(result)))
        .catch(err => reject(err));
    });
  }

  private registerWebToken(webToken: string) {
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
            currentToken['web'] = webToken;
            return this.afs.doc(docPath).update(currentToken);
          } else {
            console.log('No exists the doc');
            currentToken['web'] = webToken;
            return this.afs.doc(docPath).set(currentToken);
          }
        })
        .then((result) => resolve('T (updateWebToken) >> ' + JSON.stringify(result)))
        .catch(err => reject(err));
    });
  }

}
