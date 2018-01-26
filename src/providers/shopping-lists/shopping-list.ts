import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class ShoppingListProvider {

  constructor(private afs: AngularFirestore) {
    console.log('Hello ShoppingListProvider Provider');
  }

  getAllLists() {
    //this.afs.doc('').
  }

  getSharedLists() {

  }

  createNewList(listName: string, shared: boolean) {
    return this.afs.collection('shopping-list-db')
      .doc(listName)
      .set({ name: listName, shared });
  }

  editList() {

  }

  deleteList() {
    
  }

}
