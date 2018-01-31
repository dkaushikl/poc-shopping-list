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
    return new Promise((resolve, reject) => {
      console.log('listId: ', listId);
      const docRef = this.afs
        .doc<any>(`/shopping-list-db/${this.authSrv.getCurrentUserId()}/lists/${listId}`)
        .ref
        .get()
        .then(list => {
          let aliments: Array<any> = list.get('aliments') || [];
          return list.ref.update({ 'aliments': [...aliments, newAliment] })
            .then(() => resolve(newAliment.name))
            .catch(e => reject(e));
        })
        .catch(e => console.log('e: ', e));
    });
  }

}
