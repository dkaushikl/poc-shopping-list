import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, PopoverController } from 'ionic-angular';

import { AlimentItem, ShoppingList } from './../../models';
import { AddAlimentPage } from './../modals';
import { AlimentOptionsPage, FilteringOptionsPage } from './../popovers';
import { AlimentsProvider } from './../../providers';
import { ShoppingListProvider } from './../../providers';

@IonicPage()
@Component({
  selector: 'page-shopping-aliment-list',
  templateUrl: 'shopping-aliment-list.html',
})
export class ShoppingAlimentListPage {
  shoppingList: ShoppingList;
  listId: string;

  constructor(
    private alimentSrv: AlimentsProvider,
    private modalCtrl: ModalController,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private popCtrl: PopoverController,
    private shoppingListSrv: ShoppingListProvider
  ) {
    this.listId = this.navParams.get('listId');
    this.shoppingListSrv.getShoppingListById(this.listId).subscribe(
      shoppingLists => {
        this.shoppingList = shoppingLists.payload.data() as ShoppingList;
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingAlimentListPage');
  }

  shareList() {
    
  }

  applyFilter(popoverEvent) {
    let popover = this.popCtrl.create(FilteringOptionsPage);
    popover.onDidDismiss(option => {
      console.log('filter: ', option);
    });
    popover.present({ ev: popoverEvent });
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
    modal.onDidDismiss((data: AlimentItem) => {
      console.log('data returned: ', data);
      this.alimentSrv.addAliment(this.listId, data)
        //.then(s => console.log('s: ', s))
        //.catch(e => console.log('error: ', e))
    });
    modal.present();
  }

}
