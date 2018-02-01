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

  shoppingLists$: Observable<ShoppingList[]>;
  shoppingLists: ShoppingList[];

  constructor(
      private shoppingListSrv: ShoppingListProvider,
      private modalCtrl: ModalController,
      public navCtrl: NavController) { 
    this.shoppingLists$ = this.shoppingListSrv.getAllLists();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.shoppingLists$
      .subscribe(lists => {
        this.shoppingLists = lists.map((shoppingList: ShoppingList) => {
          return { 
            ...shoppingList, 
            alimentsChecked: (function() { 
              return shoppingList.aliments.filter(aliment => aliment.checked).length || 0 
            })()
          }
        });
      });
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
