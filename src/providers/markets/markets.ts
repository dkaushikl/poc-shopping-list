import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';

import { Market } from './../../models';
import { AuthenticationProvider } from './../authentication/authentication';
import { UtilProvider } from './../utils/util';

@Injectable()
export class MarketsProvider {

  constructor(
    private afs: AngularFirestore,
    private authSrv: AuthenticationProvider,
    private utilSrv: UtilProvider) { }

  getMarkets() {
    return this.afs
      .doc<Market>(`/markets/${this.authSrv.getCurrentUserId()}`)
      .snapshotChanges();
  }

  addMarket(name: string, color: string = null, location: string = null) {
    let newMarket = {};
    newMarket[name] = { name, color, location };
    return this.afs
      .doc(`/markets/${this.authSrv.getCurrentUserId()}`)
      .update(newMarket);
  }

  editMarket(market: Market) {
    return new Promise((resolve, reject) => {
      let docRef = this.afs.doc(`/markets/${this.authSrv.getCurrentUserId()}`).ref;
      docRef
        .get()
        .then(markets => {
          // Although "delete" is slow and not recommended, we use it for clarity
          let marketsUpdated = markets.data();
          delete marketsUpdated[market.id];
          marketsUpdated[market.name] = { 
            name: market.name, 
            color: market.color, 
            location: market.location 
          };
          docRef.set(marketsUpdated)
            .then(() => resolve())
            .catch(error => reject(error));
        })
        .catch(error => reject(error));
    });
  }

  deleteMarket(name: string) {
    return new Promise((resolve, reject) => {
      let docRef = this.afs.doc(`/markets/${this.authSrv.getCurrentUserId()}`).ref;
      docRef
        .get()
        .then(markets => {
          // Although "delete" is slow and not recommended, we use it for clarity
          let marketsFiltered = markets.data();
          delete marketsFiltered[name];
          docRef.set(marketsFiltered)
            .then(() => resolve())
            .catch(error => reject(error));
        })
        .catch(error => reject(error));
    });
  }

}
