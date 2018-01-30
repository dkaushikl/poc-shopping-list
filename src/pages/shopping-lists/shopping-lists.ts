import { Component } from '@angular/core';
import { IonicPage, ItemSliding, ModalController, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { AddNewListPage } from './../modals/';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@IonicPage()
@Component({
  selector: 'page-shopping-lists',
  templateUrl: 'shopping-lists.html',
})
export class ShoppingListsPage {
  private shoppingListCollection: AngularFirestoreCollection<any>;
  private shoppingListDoc: AngularFirestoreDocument<any>;
  shoppingLists: Observable<any[]>;

  constructor(
    private afs: AngularFirestore,
    private modalCtrl: ModalController,
    public navCtrl: NavController
  ) { 
    this.shoppingListDoc = this.afs.doc('shopping-list-db/foo');
    this.shoppingListDoc.valueChanges().subscribe(
      doc => console.log('>>> doc: ', doc),
      error => console.log('Error: ', error)
    );

    this.shoppingListCollection = this.afs.collection<any>('shopping-list-db');
    this.shoppingLists = this.shoppingListCollection.snapshotChanges()
      .map(actions => {
        return actions.map(action => ({
          $key: action.payload.doc.id, 
          ...action.payload.doc.data()
        }));
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingListsPage');
    /*this.shoppingLists = [
      { name: 'Compra semanal', checked: 3, total: 7, shared: false },
      { name: 'Barbacoa Villa Lázaro', checked: 2, total: 9, shared: false }
    ];*/
    this.shoppingLists.subscribe(
      (a) => console.log('a: ', a),
      (e) => console.log('e: ', e) 
    );
  }

  addShoppingList() {
    this.modalCtrl.create(AddNewListPage).present();
  }

  itemTapped(item: ItemSliding) {
    console.log('tap: ', item);
  }

  itemPressed(item: ItemSliding) {
    console.log('pressed: ', item);
  }

  editItem(item: ItemSliding) {
    console.log('edit: ', item);
  }

  deleteItem(item: ItemSliding) {
    console.log('deleting: ', item);
  }

}
