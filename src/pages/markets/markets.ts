import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';

import { AddMarketPage } from './../modals';

import { MarketsProvider } from './../../providers';

@IonicPage()
@Component({
  selector: 'page-markets',
  templateUrl: 'markets.html',
})
export class MarketsPage {

  markets: any[];

  constructor(
    private marketSrv: MarketsProvider,
    private modalCtrl: ModalController,
    public navCtrl: NavController, 
    public navParams: NavParams) {}

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
    this.modalCtrl.create(AddMarketPage).present();
  }

  editMarket() {
    this.marketSrv.editMarket();
  }

  deleteMarket() {
    this.marketSrv.deleteMarket();
  }

}
