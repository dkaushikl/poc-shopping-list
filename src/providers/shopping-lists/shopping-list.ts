import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';

import { ShoppingList } from './../../models';
import { AuthenticationProvider } from './../authentication/authentication';

@Injectable()
export class ShoppingListProvider {
  userId: string;

  constructor(private authSrv: AuthenticationProvider, private afs: AngularFirestore) { }

  getUserShoppingLists() {
    return this.afs
      .collection('shopping-lists', (ref) => {
        return ref.where(`sharedWith.${this.authSrv.getCurrentUserId()}`, '==', true)
      })
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as ShoppingList;
          return { id, ...data };
        });
      });
  }

  getShoppingListById(listId: string) {
    console.log('shoppingList by Id: ', listId);
    return this.afs
      .collection('/shopping-lists', (ref) => {
        let query = ref;
        query.where(`ownerId`, '==', true);
        return query;
      })
      .snapshotChanges();
  }

  createNewList(listName: string, shared: boolean) {
    return this.afs
      .collection('/shopping-lists')
      .add({ 
        ownerId: this.authSrv.getCurrentUserId(), 
        name: listName, 
        aliments: [], 
        sharedWith: {
          [this.authSrv.getCurrentUserId()]: true
        },
        timestamp: new Date()
      });
  }

  editList() {

  }

  deleteList() {
    
  }

}
