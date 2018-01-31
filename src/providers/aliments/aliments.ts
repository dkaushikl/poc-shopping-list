import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';

import { AlimentItem, ShoppingList } from './../../models';
import { AuthenticationProvider } from './../authentication/authentication';

@Injectable()
export class AlimentsProvider {
  userId: string;

  constructor(private authSrv: AuthenticationProvider, private afs: AngularFirestore) {
    console.log('Hello AlimentsProvider; id: ', this.authSrv.getCurrentUserId());
  }

  addAliment(listId: string, newAliment: AlimentItem) {
    console.log('listId: ', listId);
    const docRef = this.afs
        .doc<any>(`/shopping-list-db/${this.authSrv.getCurrentUserId()}/lists/${listId}`)
        .ref
        .get()
        .then(list => {
          let aliments: Array<any> = list.get('aliments');
          console.log('aliments: ', aliments);
          return list.ref.update({ 'aliments': [...aliments, newAliment] })
        })
        .catch(e => console.log('e: ', e));
  }

}
