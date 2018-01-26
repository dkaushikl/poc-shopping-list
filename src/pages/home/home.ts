import { Component } from '@angular/core';
import { IonicPage, ItemSliding, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  shoppingLists: any[];

  constructor(public navCtrl: NavController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.shoppingLists = [
      { name: 'Compra semanal', checked: 3, total: 7, shared: false },
      { name: 'Barbacoa Villa Lázaro', checked: 2, total: 9, shared: false }
    ];
  }

  tap(itemTapped: ItemSliding) {
    console.log('tap: ', itemTapped);
  }

  press(itemPressed: ItemSliding) {
    console.log('press: ', itemPressed);
  }

}
