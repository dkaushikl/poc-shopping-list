import { Component } from '@angular/core';
import { IonicPage, ItemSliding, ModalController, NavController } from 'ionic-angular';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

import { AddNewListPage } from './../modals';

import { ShoppingListProvider } from './../../providers';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  shoppingLists: any[];

  constructor(
      //private afAuth: AngularFireAuth, 
      //private afs: AngularFirestore, 
      private shoppingListSrv: ShoppingListProvider,
      private modalCtrl: ModalController,
      public navCtrl: NavController) { 
    this.shoppingListSrv.getAllLists().subscribe(
      (l) => {
        this.shoppingLists = l;
        console.log('Lists: ', l);
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    /*this.shoppingLists = [
      { name: 'Compra semanal', checked: 3, total: 7, shared: false },
      { name: 'Barbacoa Villa Lázaro', checked: 2, total: 9, shared: false }
    ];*/
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
