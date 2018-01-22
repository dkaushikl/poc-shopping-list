import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@IonicPage()
@Component({
  selector: 'page-shopping-lists',
  templateUrl: 'shopping-lists.html',
})
export class ShoppingListsPage {

  constructor(
    private db: AngularFirestore,
    public navCtrl: NavController, 
    public navParams: NavParams
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingListsPage');
  }

  addShoppingList() {
    /*this.userCollectionRef.add({
      name: this.shoppingName,
      timestamp: new Date()
    })
    .then(l => console.log('OK adding list: ', l))
    .catch(e => console.log('Error adding shopping list'));*/
  }

}
