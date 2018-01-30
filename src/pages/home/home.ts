import { Component } from '@angular/core';
import { IonicPage, ItemSliding, ModalController, NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

import { ShoppingAlimentListPage } from './../shopping-aliment-list/shopping-aliment-list';
import { AddNewListPage } from './../modals';
import { ShoppingList } from './../../models';
import { ShoppingListProvider } from './../../providers';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  shoppingLists: Observable<ShoppingList[]>;

  constructor(
      private shoppingListSrv: ShoppingListProvider,
      private modalCtrl: ModalController,
      public navCtrl: NavController) { 
    this.shoppingLists = this.shoppingListSrv.getAllLists();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.shoppingLists.subscribe(a => console.log('>> home lists: ', a));
  }

  openShoppingList(listId: string) {
    console.log('Opening id: ', listId);
    this.navCtrl.push(ShoppingAlimentListPage, { listId });
  }

  tap(itemTapped: ItemSliding) {
    console.log('tap: ', itemTapped);
  }

  press(itemPressed: ItemSliding) {
    console.log('press: ', itemPressed);
  }

  addShoppingList() {
    this.modalCtrl.create(AddNewListPage).present();
  }

}
