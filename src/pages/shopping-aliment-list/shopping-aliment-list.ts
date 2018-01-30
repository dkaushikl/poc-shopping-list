import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, PopoverController } from 'ionic-angular';

import { ShoppingList } from './../../models';
import { AddAlimentPage } from './../modals';
import { AlimentOptionsPage } from './../popovers';
import { ShoppingListProvider } from './../../providers';

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
    private popCtrl: PopoverController,
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

  shareList() {
    
  }

  applyFilter() {

  }

  showMoreOptions(popoverEvent) {
    let popover = this.popCtrl.create(AlimentOptionsPage);
    popover.onDidDismiss(option => {
      console.log('option: ', option);
    });
    popover.present({ ev: popoverEvent });
  }

  openModalToAddAliment() {
    let modal = this.modalCtrl.create(AddAlimentPage)
    modal.onDidDismiss(data => {
      console.log('data returned: ', data);
    });
    modal.present();
  }

}
