import { Component } from '@angular/core';
import { 
  IonicPage, ItemSliding, Loading, LoadingController, 
  ModalController, NavController, Platform 
} from 'ionic-angular';
import { Firebase } from '@ionic-native/firebase';

import { Observable } from 'rxjs/Observable';
import { merge, mergeAll, combineAll, combineLatest } from 'rxjs/operators';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

import { AddNewListPage } from './../modals';
import { ShoppingList } from './../../models';
import { ShoppingAlimentListPage } from './../shopping-aliment-list/shopping-aliment-list';
import { 
  AnalyticsProvider, MessagingProvider, ShoppingListProvider, UsersProvider, UtilProvider 
} from './../../providers';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loadingSpinner: Loading;
  shoppingLists$: Observable<ShoppingList[]>;
  errors = [''];

  constructor(
    private analyticSrv: AnalyticsProvider,
    private loadingCtrl: LoadingController,
    private messagingSrv: MessagingProvider,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private platformSrv: Platform,
    private shoppingListSrv: ShoppingListProvider,
    private usersSrv: UsersProvider,
    private utilSrv: UtilProvider
  ) { 
    console.log('0 > Constructor');
    this.usersSrv.checkIfUserDataExists().catch(e => console.log('Error: ', e));

    /*this.messagingSrv.getFirebaseToken()
      .then((token) => console.log('Token registered: ', token))
      .catch((err) => this.utilSrv.showToast('Error registering: ' + err));*/
    
    //this.analyticSrv.setScreenName('Home');
    //this.analyticSrv.logEvent('Home');
  }

  ionViewDidLoad() {
    // Fired only when a view is stored in memory
    console.log('1 > ionViewDidLoad');
    this.subscribeToShoppingLists();
  }

  ionViewWillEnter() {
    // It’s fired when entering a page, before it becomes the active one
    console.log('2 > ionViewWillEnter - many');
  }

  ionViewDidEnter() {
    // Fired when entering a page, after it becomes the active page
    console.log('3 > ionViewDidEnter - many');
  }

  subscribeToShoppingLists() {
    this.loadingSpinner = this.loadingCtrl.create({ content: 'Retrieving lists...' });
    this.loadingSpinner.present();
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
        console.log('Dismissing...');
        this.loadingSpinner.dismiss();
        return shoppingLists;
      });
  }

  getNumberOfUserShared(shoppingList: ShoppingList) {
    return Object.keys(shoppingList.sharedWith || {}).length;
  }

  openShoppingList(listId: string) {
    this.navCtrl.push(ShoppingAlimentListPage, { listId });
  }

  editShoppingList(list: ShoppingList) {
    this.modalCtrl.create(AddNewListPage, { listToEdit: list }).present();
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
