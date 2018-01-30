import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ShoppingListProvider } from './../../providers';
import { ShoppingList } from './../../models';

@IonicPage()
@Component({
  selector: 'page-shopping-aliment-list',
  templateUrl: 'shopping-aliment-list.html',
})
export class ShoppingAlimentListPage {
  shoppingList: ShoppingList;

  constructor(public navCtrl: NavController, public navParams: NavParams, private shoppingListSrv: ShoppingListProvider) {
    let listId = this.navParams.get('listId');
    this.shoppingListSrv.getShoppingListById(listId)
      .then(shoppingList => this.shoppingList = shoppingList.data() as ShoppingList)
      .catch(e => console.log('error: ', e));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingAlimentListPage');
  }

}
