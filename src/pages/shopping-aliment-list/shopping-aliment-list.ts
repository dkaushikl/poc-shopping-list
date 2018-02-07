import { Component } from '@angular/core';
import { IonicPage, ItemSliding, Modal, ModalController, NavController, NavParams, PopoverController } from 'ionic-angular';

import { AlimentItem, FilterCriteria, Market, ShoppingList } from './../../models';
import { AddAlimentPage } from './../modals';
import { AlimentOptionsPage, FilteringOptionsPage } from './../popovers';
import { 
  AlimentsProvider, AuthenticationProvider, MarketsProvider, ShoppingListProvider, UsersProvider, UtilProvider 
} from './../../providers';

@IonicPage()
@Component({
  selector: 'page-shopping-aliment-list',
  templateUrl: 'shopping-aliment-list.html',
})
export class ShoppingAlimentListPage {
  modal: Modal;
  marketsList: Array<Market>;
  shoppingList: ShoppingList;
  takenAliments: Array<AlimentItem>;
  listId: string;
  filterCriteria: FilterCriteria;

  constructor(
    private alimentSrv: AlimentsProvider,
    private authSrv: AuthenticationProvider,
    private marketSrv: MarketsProvider,
    private modalCtrl: ModalController,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private popCtrl: PopoverController,
    private shoppingListSrv: ShoppingListProvider,
    private userSrv: UsersProvider,
    private utilSrv: UtilProvider
  ) {
    this.listId = this.navParams.get('listId');
    this.filterCriteria = { sorting: 'none', visibility: 'show' };
    this.takenAliments = new Array<AlimentItem>();
    
    this.marketSrv.getMarkets().subscribe(
      markets => this.marketsList = Object['values'](markets.payload.data() || {})
    );

    this.shoppingListSrv.getShoppingListById(this.listId).subscribe(
      shoppingLists => {
        this.shoppingList = shoppingLists.payload.data() as ShoppingList;
      }
    );

    this.modal = this.modalCtrl.create(AddAlimentPage);
    this.modal.onDidDismiss((data: AlimentItem) => {
      if(data) {
        this.alimentSrv.addAliment(this.listId, data)
          .then(alimentAdded => {
            this.utilSrv.showToast(alimentAdded + ' has been added successfully!');
            if(data && data['addAndReopen'])
              setTimeout(this.openModalToAddAliment(), 250);
          })
          .catch(e => this.utilSrv.showToast('Error: ' + e));
      }
    });
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
    this.utilSrv.showPromptAlert(
      'Share with...', 
      'Write the user\'s email to send an invitation',
      [
        { name: 'email', placeholder: 'Email address' }
      ],
      [
        { text: 'Cancel', handler: null },
        { text: 'Send!', handler: data => { 
            if(this.userSrv.isValidEmail(data.email)) {
              this.userSrv.getUserUidFromEmail(data.email).subscribe(
                userUid => {
                  // Obtain the UID associated to the email address
                  let uid: string = (userUid && userUid.length >= 1) 
                    ? userUid[0].payload.doc.data().uid
                    : null;

                  // Check if the UID is valid and is different from mine
                  if(uid !== null && uid !== this.authSrv.getCurrentUserId()) {
                    this.shoppingListSrv.shareShoppingList(this.listId, uid)
                      .then(() => this.utilSrv.showToast('Invitation successfully sent!'))
                      .catch(error => this.utilSrv.showToast('Error: ', error));
                  } else {
                    this.utilSrv.showToast('Invalid email address! Please, try again...');
                  }
                },
                error => this.utilSrv.showToast('Error: ', error)
              );
            } else {  // Email not valid
              this.utilSrv.showToast(`Error: the address email is not valid`);
            }
          } 
        }
      ]
    );
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
    this.modal.present();
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
      if(modifiedAliment) {
        this.alimentSrv.updateAliment(this.listId, alimentToEdit.name, modifiedAliment)
          .then(alimentUpdated => this.utilSrv.showToast(alimentUpdated + ' has been updated successfully!'))
          .catch(e => this.utilSrv.showToast('Error: ' + e));
      }
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
