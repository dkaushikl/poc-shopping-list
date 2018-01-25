import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-add-market',
  templateUrl: 'add-market.html',
})
export class AddMarketPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMarketPage');
  }

  cancel() {
    this.navCtrl.pop();
  }

}
