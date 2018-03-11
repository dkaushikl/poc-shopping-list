import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

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
    private platformSrv: Platform,
    private utilSrv: UtilProvider
  ) {
    console.log('Hello MessagingProvider Provider');
  }

  getFirebaseToken() {
    return new Promise((resolve, reject) => {
      if(this.utilSrv.isNativePlatform()) {  // Native platform
        this.platformSrv.ready()
          .then(() => {
            // Register an observable for getting notified when a token is refreshed
            this.firebaseSrv.onTokenRefresh().subscribe(
              refreshedToken => {
                console.log('Token Refreshed: ', refreshedToken);
                this.registerNativeToken(refreshedToken);
              }
            );

            // Get firebase token (native)
            return this.firebaseSrv.getToken();
          })
          .then(token => { 
            console.log('Firebas native token: ' + token);
            return this.registerNativeToken(token);
          })
          .catch(error => reject('Platform error registering native device: ' + error));
      } else {  // Web platform
        console.log('Request permissions...');
        return this.messaging.requestPermission()
          .then(() => {
            console.log('requested permissions');
            return this.messaging.getToken();
          })
          .then((token) => {
            console.log('TokeN web is: ', token);
            if(!this.authSrv.logged) return;
            return this.registerWebToken(token);
          })
          .catch(error => reject(`Error: Unable to get permission to notify (${error})`));
      }
    });
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
