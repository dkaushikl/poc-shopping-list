import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MarketsProvider } from './../../providers';

@IonicPage()
@Component({
  selector: 'page-markets',
  templateUrl: 'markets.html',
})
export class MarketsPage {

  markets: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private marketSrv: MarketsProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MarketsPage');
    this.marketSrv.getMarkets();
    this.markets = [
      { name: 'Mercadona', color: '#00FF00' },
      { name: 'Lidl', color: '#0000FF' },
      { name: 'Dia', color: '#FF0000' }
    ];
  }

  addMarket() {
    this.marketSrv.addMarket();
  }

  editMarket() {
    this.marketSrv.editMarket();
  }

  deleteMarket() {
    this.marketSrv.deleteMarket();
  }

}
