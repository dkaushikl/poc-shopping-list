import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';

import { AUTH_PROVIDER } from './../../models';
import { AuthenticationProvider } from './..';

@Injectable()
export class UsersProvider {

  constructor(private afs: AngularFirestore, private authSrv: AuthenticationProvider) { }

  checkIfUserDataExists() {
    const userRef = `/users/${this.authSrv.getCurrentUserId()}`;
    return new Promise((resolve, reject) => {
      this.afs.doc(userRef).ref.get()
        .then(docSnapshot => {
          if(!docSnapshot.exists) {
            return this.saveUserData(userRef);
          } else {
            resolve();
          }
        })
        .catch(e => reject(e));
    });
  }

  saveUserData(userRef: string) {
    let user = this.authSrv.getCurrentUser();
    return this.afs.doc(userRef).set({
      uid: user.uid,
      name: user.email,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      authProvider: AUTH_PROVIDER.GOOGLE
    });
  }

}
