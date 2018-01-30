import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';

import { ShoppingListProvider } from './../../../providers';

@IonicPage()
@Component({
  selector: 'page-add-aliment',
  templateUrl: 'add-aliment.html',
})
export class AddAlimentPage {

  aliment: string;
  quantity: string;

  constructor(
    private navCtrl: NavController, 
    private shoppingListSrv: ShoppingListProvider,
    private viewCtrl: ViewController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddAlimentPage');
  }

  addAliment() {
    this.viewCtrl.dismiss({ 
      aliment: this.aliment, 
      quantity: this.quantity 
    });
  }

  cancel() {
    this.navCtrl.pop();
  }

}
