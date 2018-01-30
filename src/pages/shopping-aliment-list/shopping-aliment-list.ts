import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';

import { ShoppingList } from './../../models';
import { ShoppingListProvider } from './../../providers';
import { AddAlimentPage } from './../modals';

@IonicPage()
@Component({
  selector: 'page-shopping-aliment-list',
  templateUrl: 'shopping-aliment-list.html',
})
export class ShoppingAlimentListPage {
  shoppingList: ShoppingList;

  constructor(
    private modalCtrl: ModalController,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private shoppingListSrv: ShoppingListProvider
  ) {
    let listId = this.navParams.get('listId');
    this.shoppingListSrv.getShoppingListById(listId)
      .then(shoppingList => this.shoppingList = shoppingList.data() as ShoppingList)
      .catch(e => console.log('error: ', e));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingAlimentListPage');
  }

  openModalToAddAliment() {
    let modal = this.modalCtrl.create(AddAlimentPage)
    modal.onDidDismiss(data => {
      console.log('data returned: ', data);
    });
    modal.present();
  }

}
