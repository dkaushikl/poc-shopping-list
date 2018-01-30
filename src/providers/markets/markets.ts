import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';

import { Market } from './../../models';
import { AuthenticationProvider } from './../authentication/authentication';

@Injectable()
export class MarketsProvider {

  constructor(private authSrv: AuthenticationProvider, private afs: AngularFirestore) {
    console.log('Hello MarketsProvider Provider -> ', this.authSrv.getCurrentUser().displayName);
  }

  getMarkets() {
    return this.afs
      .collection<Market>(`/shopping-list-db/${this.authSrv.getCurrentUserId()}/markets`)
      .snapshotChanges()
      .map(actions => {
        return actions.map(action => {
          const id = action.payload.doc.id;
          const data = action.payload.doc.data() as Market;
          return { id, ...data };
        });
      });
  }

  addMarket(name: string, color: string = null, location: string = null) {
    return this.afs
      .collection(`/shopping-list-db/${this.authSrv.getCurrentUserId()}/markets`)
      .add({ name, color, location });
  }

  editMarket() {

  }

  deleteMarket() {
    
  }

}
