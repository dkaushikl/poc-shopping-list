import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { AddNewListPage } from './add-new-list/add-new-list';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@IonicPage()
@Component({
  selector: 'page-shopping-lists',
  templateUrl: 'shopping-lists.html',
})
export class ShoppingListsPage {

  constructor(
    private db: AngularFirestore,
    public navCtrl: NavController
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingListsPage');
  }

  addShoppingList() {
    console.log('Navigating...');
    this.navCtrl.push(AddNewListPage, {
      animate: true,
      direction: 'forward'
    });

    /*this.userCollectionRef.add({
      name: this.shoppingName,
      timestamp: new Date()
    })
    .then(l => console.log('OK adding list: ', l))
    .catch(e => console.log('Error adding shopping list'));*/
  }

}
