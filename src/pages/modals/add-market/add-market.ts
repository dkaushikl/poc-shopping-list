import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { Market } from './../../../models';
import { MarketsProvider, UtilProvider } from './../../../providers';

@IonicPage()
@Component({
  selector: 'page-add-market',
  templateUrl: 'add-market.html',
})
export class AddMarketPage {
  marketName: string;
  marketColor: string;
  marketLocation: string;

  constructor(private marketSrv: MarketsProvider, public navCtrl: NavController, private utilSrv: UtilProvider) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMarketPage');
  }

  addNewMarket() {
    this.marketSrv.addMarket(this.marketName, this.marketColor, this.marketLocation)
      .then(docRef => {
        console.log('docRef: ', docRef)
        this.utilSrv.showToast('Market added successfully!');
        this.navCtrl.pop();
      })
      .catch(error => this.utilSrv.showToast(error))
  }

  cancel() {
    this.navCtrl.pop();
  }

}
