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

  shareShoppingList(listId: string, userIdToShare: string) {
    return this.afs
      .doc(`/shopping-lists/${listId}`)
      .ref.get()
      .then(doc => {
        let list = doc.data() as ShoppingList;
        list.sharedWith[userIdToShare] = true;
        return doc.ref.update(list);
      })
      .catch(e => console.log('errorrrr: ', e));
  }

  sendUserInvitationsToNewUsers(listId: string, userEmailsToShare: Array<string>) {
    let x;
    console.log('Calling to cloud function...');
    const pId = 'shopping-list-db';
    const db = '(default)';
    const docPath = 'data/users/0uvgMY90EOVPnkT5SDxha2OO20i2';
    const headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', '*');

    this.http.get(
      //'https://us-central1-shopping-list-db.cloudfunctions.net/getUserIdentifier'
      `https://firestore.googleapis.com/v1beta1/projects/${pId}/databases/${db}/documents/${docPath}`,
      { headers }
    ).subscribe(
      s => console.log('S: ', s),
      e => console.log('E: ', e)
    );

    /*userEmailsToShare.map(email => {
      return this.afs.collection('users', ref => {
        return ref.where('email', '==', email);
      });
    })
    .reduce((previous, current, index, array) => {
      previous.valueChanges().subscribe(a => a);
    });*/

    /*.forEach((snapshots, index) => { 
      snapshots.valueChanges().subscribe(
        fireResult => fireResult.map((user: User) => {
          
        })
      );
    });*/

    /*return this.afs
      .doc(`/shopping-lists/${listId}`)
      .ref.get()
      .then(doc => {
        let list = doc.data() as ShoppingList;
        let sharedList = { [list.ownerId]: true };
        userIdsToShare.forEach(userId => sharedList[userId] = true);
        list.sharedWith = sharedList;
        return doc.ref.set(list);
      })
      .catch(e => console.log('error: ', e));*/
  }

  editList() {

  }

  deleteList(listId: string) {
    return this.afs
      .doc(`/shopping-lists/${listId}`)
      .ref.delete()
  }

}
