import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, PopoverController } from 'ionic-angular';

import { AlimentItem, Market, ShoppingList } from './../../models';
import { AddAlimentPage } from './../modals';
import { AlimentOptionsPage, FilteringOptionsPage } from './../popovers';
import { AlimentsProvider, MarketsProvider, ShoppingListProvider, UtilProvider } from './../../providers';

@IonicPage()
@Component({
  selector: 'page-shopping-aliment-list',
  templateUrl: 'shopping-aliment-list.html',
})
export class ShoppingAlimentListPage {
  marketsList: Array<Market>;
  shoppingList: ShoppingList;
  takenAliments: Array<AlimentItem>;
  listId: string;

  constructor(
    private alimentSrv: AlimentsProvider,
    private marketSrv: MarketsProvider,
    private modalCtrl: ModalController,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private popCtrl: PopoverController,
    private shoppingListSrv: ShoppingListProvider,
    private utilSrv: UtilProvider
  ) {
    this.listId = this.navParams.get('listId');
    this.takenAliments = new Array<AlimentItem>();
    this.marketSrv.getMarkets().subscribe(
      markets => this.marketsList = markets
    );
    this.shoppingListSrv.getShoppingListById(this.listId).subscribe(
      shoppingLists => this.shoppingList = shoppingLists.payload.data() as ShoppingList
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingAlimentListPage');
  }

  getMarketColor(marketName: string) {
    if(!this.marketsList) return '';
    let market = this.marketsList.find(market => market.name === marketName);
    return (market) ? market.color : '';
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
    let modal = this.modalCtrl.create(AddAlimentPage);
    modal.onDidDismiss((data: AlimentItem) => {
      this.alimentSrv.addAliment(this.listId, data)
        .then(alimentAdded => this.utilSrv.showToast(alimentAdded + ' has been added successfully!'))
        .catch(e => this.utilSrv.showToast('Error: ' + e));
    });
    modal.present();
  }

  updateCheckedAlimentList(aliment: AlimentItem) {
    // WIP
  }

  updateTakenAlimentList(aliment: AlimentItem) {
    // WIP
  }

  editAlimentItem(alimentToEdit: AlimentItem) {
    let modal = this.modalCtrl.create(AddAlimentPage, { alimentToEdit });
    modal.onDidDismiss((modifiedAliment: AlimentItem) => {
      this.alimentSrv.updateAliment(this.listId, alimentToEdit.name, modifiedAliment)
        .then(alimentUpdated => this.utilSrv.showToast(alimentUpdated + ' has been updated successfully!'))
        .catch(e => this.utilSrv.showToast('Error: ' + e));
    });
    modal.present();
  }

  deleteAlimentItem(aliment: AlimentItem) {
    this.utilSrv.showAlert(
      'Remove aliment', 
      `Are you sure to delete "${aliment.name}"?`,
      [
        { text: 'Cancel', handler: () => {} },
        { text: 'Remove', handler: () => {
            this.alimentSrv.deleteAlimentFromShoppingList(this.listId, aliment)
              .then(() => this.utilSrv.showToast(`"${aliment.name}" was removed successfully!`))
              .catch(e => this.utilSrv.showToast('Error: ', e));
          } 
        }
      ]
    );
  }

}
