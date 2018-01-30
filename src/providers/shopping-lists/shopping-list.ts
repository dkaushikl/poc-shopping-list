import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';

import { AuthenticationProvider } from './../authentication/authentication';

@Injectable()
export class ShoppingListProvider {
  userId: string;

  constructor(private authSrv: AuthenticationProvider, private afs: AngularFirestore) {
    console.log('Hello ShoppingListProvider Provider; id: ', this.authSrv.getCurrentUserId());
  }

  getAllLists() {
    return this.afs
      .collection<any>(`/shopping-list-db/${this.authSrv.getCurrentUserId()}/lists`)
      .snapshotChanges()
      .map(actions => {
        return actions.map(action => {
          const id = action.payload.doc.id;
          const data = action.payload.doc.data() as any;
          return { id, ...data };
        });
      });
  }

  getSharedLists() {

  }

  createNewList(listName: string, shared: boolean) {
    this.afs
      .collection(`/shopping-list-db/${this.authSrv.getCurrentUserId()}/lists`)
      .add({ name: listName, aliments: [], shared, sharedWith: [] })
      .then(docRef => console.log('success: ', docRef))
      .catch(error => console.log('error: ', error));
  }

  editList() {

  }

  deleteList() {
    
  }

}
