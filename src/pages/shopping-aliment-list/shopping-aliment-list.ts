import { Component } from '@angular/core';
import { IonicPage, ItemSliding, ModalController, NavController, NavParams, PopoverController } from 'ionic-angular';

import { AlimentItem, FilterCriteria, Market, ShoppingList } from './../../models';
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
  filterCriteria: FilterCriteria;

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
    this.filterCriteria = { sorting: 'none', visibility: 'show' };
    this.takenAliments = new Array<AlimentItem>();
    
    this.marketSrv.getMarkets().subscribe(
      markets => this.marketsList = Object['values'](markets.payload.data())
    );

    this.shoppingListSrv.getShoppingListById(this.listId).subscribe(
      shoppingLists => {
        console.log('list: ', shoppingLists.payload.data());
        this.shoppingList = shoppingLists.payload.data() as ShoppingList;
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingAlimentListPage');
  }

  getMarketColor(marketName: string) {
    if(!this.marketsList) return '';
    let market = this.marketsList.find(market => market.name === marketName);
    console.log('market color: ', ((market) ? market.color : ''));
    return (market) ? market.color : '';
  }

  shareList() {
    
  }

  applyFilter(popoverEvent) {
    let popover = this.popCtrl.create(FilteringOptionsPage, { 
      currentValues: this.filterCriteria 
    }, {
      enableBackdropDismiss:false
    });
    popover.onDidDismiss(filterOptions => this.filterCriteria = filterOptions);
    popover.present({ ev: popoverEvent });
  }

  showMoreOptions(popoverEvent) {
    let popover = this.popCtrl.create(AlimentOptionsPage);
    popover.onDidDismiss(option => {
      switch(option) {
        case 'check-all':
          this.alimentSrv.setBulkAlimentState(this.listId, true)
            .then(() => this.utilSrv.showToast('Done! :-)'))
            .catch(e => this.utilSrv.showToast('Error: ' + e));
          break;
        case 'uncheck-all':
          this.alimentSrv.setBulkAlimentState(this.listId, false)
            .then(() => this.utilSrv.showToast('Done! :-)'))
            .catch(e => this.utilSrv.showToast('Error: ' + e));
          break;
      }
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
    this.alimentSrv.setAlimentState(this.listId, aliment)
      .then(() => {})
      .catch(e => this.utilSrv.showToast('Error: ' + e));
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

  deleteAlimentItem(slidingItem: ItemSliding, aliment: AlimentItem) {
    this.utilSrv.showAlert(
      'Remove aliment', 
      `Are you sure to delete "${aliment.name}"?`,
      [
        { text: 'Cancel', handler: () => slidingItem.close() },
        { text: 'Remove', handler: () => {
            this.alimentSrv.deleteAlimentFromShoppingList(this.listId, aliment)
              .then(() => {
                slidingItem.close();
                this.utilSrv.showToast(`"${aliment.name}" was removed successfully!`);
              })
              .catch(e => this.utilSrv.showToast('Error: ', e));
          } 
        }
      ]
    );
  }

}
