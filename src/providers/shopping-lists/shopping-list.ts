import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';

import { ShoppingList } from './../../models';
import { AuthenticationProvider } from './../authentication/authentication';

@Injectable()
export class ShoppingListProvider {
  userId: string;

  constructor(private authSrv: AuthenticationProvider, private afs: AngularFirestore) {
    console.log('Hello ShoppingListProvider Provider; id: ', this.authSrv.getCurrentUserId());
  }

  getAllLists() {
    return this.afs
      .collection<ShoppingList>(`/shopping-list-db/${this.authSrv.getCurrentUserId()}/lists`)
      .snapshotChanges()
      .map(actions => {
        return actions.map(action => {
          const id = action.payload.doc.id;
          const data = action.payload.doc.data() as ShoppingList;
          return { id, ...data };
        });
      });
  }

  getSharedLists() {

  }

  getShoppingListById(listId: string) {
    return this.afs
      .doc<ShoppingList>(`/shopping-list-db/${this.authSrv.getCurrentUserId()}/lists/${listId}`)
      .snapshotChanges();
  }

  createNewList(listName: string, shared: boolean) {
    return this.afs
      .collection(`/shopping-list-db/${this.authSrv.getCurrentUserId()}/lists`)
      .add({ name: listName, aliments: [], shared, sharedWith: [] });
  }

  editList() {

  }

  deleteList() {
    
  }

}
