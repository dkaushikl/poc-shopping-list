import { Component } from '@angular/core';
import { IonicPage, ItemSliding, ModalController, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { AddNewListPage } from './../modals/';
import { ShoppingList } from './../../models';
import { ShoppingAlimentListPage } from './../shopping-aliment-list/shopping-aliment-list';
import { ShoppingListProvider, UtilProvider } from './../../providers';

@IonicPage()
@Component({
  selector: 'page-shopping-lists',
  templateUrl: 'shopping-lists.html',
})
export class ShoppingListsPage {
  private shoppingListCollection: AngularFirestoreCollection<any>;
  private shoppingListDoc: AngularFirestoreDocument<any>;
  shoppingListsObs: Observable<ShoppingList[]>;

  constructor(
    private afs: AngularFirestore,
    private modalCtrl: ModalController,
    public navCtrl: NavController,
    private shoppingListSrv: ShoppingListProvider,
    private utilSrv: UtilProvider
  ) { 
    this.shoppingListsObs = this.shoppingListSrv.getUserShoppingLists()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingListsPage');
  }

  addShoppingList() {
    this.modalCtrl.create(AddNewListPage).present();
  }

  openList(shoppingListId: string) {
    this.navCtrl.push(ShoppingAlimentListPage, { listId: shoppingListId });
  }

  itemPressed(item: ItemSliding) {
    console.log('pressed: ', item);
  }

  editItem(list: ShoppingList) {
    console.log('edit: ', list);
    let modal = this.modalCtrl.create(AddNewListPage, { listToEdit: list });
    modal.onDidDismiss(data => {
      console.log('Data modified: ');
    });
    modal.present();
  }

  deleteItem(list: ShoppingList, slidingItem: ItemSliding) {
    slidingItem.close();
    this.utilSrv.showAlert(
      'Remove list', 
      `Are you sure to delete "${list.name}"?`,
      [
        { text: 'Cancel', handler: () => slidingItem.close() },
        { text: 'Remove', handler: () => {
          this.shoppingListSrv.deleteList(list.id)
            .then(() => {
              slidingItem.close();
              this.utilSrv.showToast(`"${list.name}" was removed successfully!`);
            })
            .catch(e => this.utilSrv.showToast('Error: ', e));
          } 
        }
      ]
    );
  }

}
