import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AngularFirestore } from 'angularfire2/firestore';

import { ShoppingList, User } from './../../models';
import { AuthenticationProvider } from './../authentication/authentication';

@Injectable()
export class ShoppingListProvider {
  userId: string;

  constructor(private authSrv: AuthenticationProvider, private afs: AngularFirestore, private http: HttpClient) { }

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
    return this.afs.doc(`shopping-lists/${listId}`).snapshotChanges();
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

  shareShoppingList(listId: string, userIdToShare: Array<string>) {
    return this.afs
      .doc(`/shopping-lists/${listId}`)
      .ref.get()
      .then(doc => {
        let list = doc.data() as ShoppingList;
        userIdToShare.forEach(id => list.sharedWith[id] = true);
        //list.sharedWith[userIdToShare] = true;
        return doc.ref.update(list);
      })
      .catch(e => console.log('errorrrr: ', e));
  }

  sendUserInvitationsToNewUsers(listId: string, userEmailsToShare: Array<string>) {
    const endpoint = 'https://us-central1-shopping-list-db.cloudfunctions.net/getUserIdentifier';
    return this.http.post(endpoint, { emails: userEmailsToShare });
  }

  editList() {

  }

  deleteList(listId: string) {
    return this.afs
      .doc(`/shopping-lists/${listId}`)
      .ref.delete()
  }

}
