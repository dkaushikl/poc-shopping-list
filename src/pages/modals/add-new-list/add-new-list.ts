import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { ShoppingListProvider, UtilProvider } from './../../../providers';

@IonicPage()
@Component({
  selector: 'page-add-new-list',
  templateUrl: 'add-new-list.html',
})
export class AddNewListPage {

  shoppingListName: string;
  sharedList: boolean;

  constructor(
    private navCtrl: NavController, 
    private shoppingListSrv: ShoppingListProvider,
    private utilSrv: UtilProvider
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNewListPage');
    this.shoppingListName = '';
    this.sharedList = false;
  }

  shareShoppingListWithUser() {
    
  }

  createNewShoppingList() {
    this.shoppingListSrv.createNewList(this.shoppingListName, this.sharedList)
      .then(docRef => {
        this.utilSrv.showToast('List created successfully');
        this.navCtrl.pop();
      })
      .catch(error => console.log('error: ', error));
  }

  cancel() {
    this.navCtrl.pop();
  }

}
