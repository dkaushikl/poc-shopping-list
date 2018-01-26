import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { ShoppingListProvider } from './../../../providers';

@IonicPage()
@Component({
  selector: 'page-add-new-list',
  templateUrl: 'add-new-list.html',
})
export class AddNewListPage {

  shoppingListName: string;
  sharedList: boolean;

  constructor(private navCtrl: NavController, private shoppingListSrv: ShoppingListProvider) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNewListPage');
    this.shoppingListName = '';
    this.sharedList = false;
  }

  createNewShoppingList() {
    this.shoppingListSrv.createNewList(this.shoppingListName, this.sharedList)
      .then()
      .catch();
  }

  cancel() {
    this.navCtrl.pop();
  }

}
