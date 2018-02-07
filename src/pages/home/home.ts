import { Component } from '@angular/core';
import { IonicPage, ItemSliding, ModalController, NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { merge, mergeAll, combineAll, combineLatest } from 'rxjs/operators';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

import { ShoppingAlimentListPage } from './../shopping-aliment-list/shopping-aliment-list';
import { AddNewListPage } from './../modals';
import { ShoppingList } from './../../models';
import { ShoppingListProvider, UsersProvider } from './../../providers';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  shoppingLists$: Observable<ShoppingList[]>;

  constructor(
      private shoppingListSrv: ShoppingListProvider,
      private modalCtrl: ModalController,
      public navCtrl: NavController,
      private usersSrv: UsersProvider) { 
    this.usersSrv.checkIfUserDataExists().catch(e => console.log('Error: ', e));
    this.shoppingLists$ = this.shoppingListSrv
      .getUserShoppingLists()
      .map((shoppingLists: ShoppingList[]) => {
        shoppingLists.map(list => {
          let checkedAliments = 0;
          list.aliments.forEach(aliment => {
            if(aliment.checked) 
              checkedAliments++;
          });
          list['checked'] = checkedAliments;
        });
        return shoppingLists;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  getNumberOfUserShared(shoppingList: ShoppingList) {
    return Object.keys(shoppingList.sharedWith || {}).length;
  }

  openShoppingList(listId: string) {
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
